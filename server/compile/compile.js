const shell = require('shelljs');
const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const ini = require('ini');
const debug = require('debug')('compile');

const { switchToBranch } = require('../git/git');
const {
  tasmotaRepo,
  userConfigOvewrite,
  userPlatformioIni,
  tasmotaVersionFile,
  templatePlatformioIni,
  tcSrcCoresIni,
  tcDestCoresIni,
} = require('../config/config');

// Since 6.7.1.1 there is no sonoff src dir. New dir is tasmota
// if we switch to "old" branch with sonoff dir rename that dir to new name
const createNewTasmotaStructure = () => {
  const oldPath = path.resolve(tasmotaRepo, 'sonoff');
  const newPath = path.resolve(tasmotaRepo, 'tasmota');
  const isOldStructure = fs.pathExistsSync(oldPath);

  if (isOldStructure) {
    try {
      fs.moveSync(oldPath, newPath, { overwrite: true });
    } catch (e) {
      throw new Error(`Cannot create new Tasmota structure: ${e}`);
    }
  }
};

const prepareFiles = async (data) => {
  let config;
  await switchToBranch(data.tasmotaVersion);
  createNewTasmotaStructure();

  // only uppercase keys are those which are important to place in user_config_overwrite.h
  // lowercase keys are 'helpers'
  const userDefines = Object.keys(data).filter((e) => {
    const f = e[0].toLowerCase();
    return f !== e[0];
  });

  const getTasmotaVersion = () => {
    const fileExists = fs.pathExistsSync(tasmotaVersionFile);
    const versRegexp = /const uint32_t VERSION = (.*);/gm;

    if (fileExists) {
      const file = fs.readFileSync(tasmotaVersionFile, {
        encoding: 'utf8',
        flag: 'r',
      });
      const match = [...file.matchAll(versRegexp)];
      if (match[0]) {
        return parseInt(match[0][1]);
      } else {
        throw new Error(
          `Cannot find Tasmota version in ${tasmotaVersionFile}.`
        );
      }
    } else {
      throw new Error(`${tasmotaVersionFile} does not exists.`);
    }
  };

  // user_config_override.g file
  const outputOverwrites = userDefines.map((e) => {
    if (_.isBoolean(data[e])) {
      if (data[e]) {
        return `#ifdef ${e}\n  #undef ${e}\n#endif\n#define ${e}\n\n`;
      }
      return `#ifdef ${e}\n  #undef ${e}\n#endif\n\n`;
    }
    if (e === 'MY_LANGUAGE') {
      const tasmotaVersion = getTasmotaVersion();
      if (tasmotaVersion > 0x08020005) {
        // with Tasmota version 8.2.6 language files ware renamed from pl-PL to pl_PL
        data[e] = ('' + data[e]).replace('-', '_');
      }
      return `#ifdef ${e}\n  #undef ${e}\n#endif\n#define ${e}\t${data[e]}\n\n`;
    }
    return `#ifdef ${e}\n  #undef ${e}\n#endif\n#define ${e}\t"${data[e]}"\n\n`;
  });

  if (data.customParams) {
    outputOverwrites.push(`${data.customParams}\n\n`);
  }
  outputOverwrites.unshift(
    '#warning **** user_config_override.h: Using Settings from this File ****\n\n'
  );
  outputOverwrites.unshift(
    '#ifndef _USER_CONFIG_OVERRIDE_H_\n',
    '#define _USER_CONFIG_OVERRIDE_H_\n\n'
  );
  outputOverwrites.push('#endif');

  try {
    await fs.writeFile(userConfigOvewrite, outputOverwrites.join(''));
    debug(`Successfully write ${userConfigOvewrite}`);
  } catch (e) {
    throw new Error(`Cannot write to ${userConfigOvewrite}: ${e}`);
  }

  // platformio.ini file
  try {
    const platformioFileConetent = await fs.readFile(
      templatePlatformioIni,
      'utf8'
    );
    const buildFlags = Object.keys(data)
      .filter((e) => e.startsWith('buildflag_'))
      .reduce((accumulator, current) => `${accumulator} ${data[current]}`, '');

    const tasmotaVersion = getTasmotaVersion();
    config = ini.parse(platformioFileConetent);

    // there was a folder name change for extra_scripts from version above 9.1.0
    // extra scripts are now lacated in 'pio-tools' instead of 'pio' folder
    let fixedPathForExtraScript = config.common.extra_scripts;
    fixedPathForExtraScript = fixedPathForExtraScript.replace(/replace/g, 'pio-tools');
    if (tasmotaVersion <= 0x09010000) {
      fixedPathForExtraScript = fixedPathForExtraScript.replace(/pio-tools/g, 'pio');
    }
    config.common.extra_scripts = fixedPathForExtraScript;
    
    // there is also lib folder structure change for version 9.1.0 and above
    config.platformio.lib_dir = 'lib/default';
    if (tasmotaVersion < 0x09010000) {
      config.platformio.lib_dir = 'lib';
    }

    config.user_defined.board_memory = data.memoryBuildFlag;
    config.user_defined.board = data.boardVersion.board;
    config.user_defined.f_cpu = data.boardSpeed;
    config.user_defined.build_flags = buildFlags.trim();
    config.core_active.platform = `\${${data.coreVersion.platform}.platform}`;
    config.core_active.platform_packages = `\${${data.coreVersion.platform}.platform_packages}`;
    config.core_active.build_flags = `\${${data.coreVersion.platform}.build_flags}`;
    debug(ini.stringify(config));
  } catch (e) {
    throw new Error(
      `Cannot load content from platformio.ini template file\n${e}\n`
    );
  }

  try {
    await fs.writeFileSync(userPlatformioIni, ini.stringify(config));
    await fs.copyFileSync(tcSrcCoresIni, tcDestCoresIni);
  } catch (e) {
    throw new Error(`Cannot write new content to platformio.ini file\n${e}\n`);
  }
};

const compileCode = (socket, data) => {
  prepareFiles(data)
    .then((prepared) => {
      const cdRet = shell.cd(tasmotaRepo);
      let outputMessages = [];
      const MESSAGE_BUFFER_SIZE = 5;

      if (cdRet.code !== 0) {
        socket.emit('message', cdRet.stderr);
        socket.emit('finished', { status: cdRet.code, message: cdRet.stderr });
        debug(cdRet.stderr);
        return;
      }

      const child = shell.exec('pio run', { silent: true, async: true });

      child.on('exit', (code, signal) => {
        const message = `Finished. Exit code: ${code}.\n`;
        socket.emit('message', outputMessages.join(''));
        socket.emit('message', message);
        socket.emit('finished', { ok: code === 0 });
        debug(message);
      });

      child.stderr.on('data', (stderrData) => {
        outputMessages.push(stderrData);
        if (outputMessages.length > MESSAGE_BUFFER_SIZE) {
          socket.emit('message', outputMessages.join(''));
          outputMessages = [];
        }
        debug(stderrData);
      });

      child.stdout.on('data', (stdoutData) => {
        outputMessages.push(stdoutData);
        if (outputMessages.length > MESSAGE_BUFFER_SIZE) {
          socket.emit('message', outputMessages.join(''));
          outputMessages = [];
        }
        debug(stdoutData);
      });
    })
    .catch((e) => {
      socket.emit('message', e.message);
      socket.emit('finished', { ok: false });
      debug(e);
    });
};

module.exports = { compileCode };
