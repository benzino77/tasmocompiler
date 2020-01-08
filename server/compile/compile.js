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
  templatePlatformioIni,
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

  // user_config_override.g file
  const outputOverwrites = userDefines.map((e) => {
    if (_.isBoolean(data[e])) {
      if (data[e]) {
        return `#ifdef ${e}\n  #undef ${e}\n#endif\n#define ${e}\n\n`;
      }
      return `#ifdef ${e}\n  #undef ${e}\n#endif\n\n`;
    }
    if (e === 'MY_LANGUAGE') {
      return `#ifdef ${e}\n  #undef ${e}\n#endif\n#define ${e}\t${data[e]}\n\n`;
    }
    return `#ifdef ${e}\n  #undef ${e}\n#endif\n#define ${e}\t"${data[e]}"\n\n`;
  });

  if (data.customParams) {
    outputOverwrites.push(`${data.customParams}\n\n`);
  }
  outputOverwrites.unshift('#warning **** user_config_override.h: Using Settings from this File ****\n\n');
  outputOverwrites.unshift('#ifndef _USER_CONFIG_OVERRIDE_H_\n', '#define _USER_CONFIG_OVERRIDE_H_\n\n');
  outputOverwrites.push('#endif');

  try {
    await fs.writeFile(userConfigOvewrite, outputOverwrites.join(''));
    debug(`Successfully write ${userConfigOvewrite}`);
  } catch (e) {
    throw new Error(`Cannot write to ${userConfigOvewrite}: ${e}`);
  }

  // platformio.ini file
  try {
    const platformioFileConetent = await fs.readFile(templatePlatformioIni, 'utf8');
    config = ini.parse(platformioFileConetent);
    // config.user_defined.board_memory = `${data.coreVersion.mem_prefix}${data.boardVersion.mem_suffix}`;
    config.user_defined.board_memory = data.memoryBuildFlag;
    config.user_defined.board = data.boardVersion.board;
    config.user_defined.f_cpu = data.boardSpeed;
    config.core_active.platform = `\${${data.coreVersion.platform}.platform}`;
    config.core_active.build_flags = `\${${data.coreVersion.platform}.build_flags}`;
    debug(ini.stringify(config));
  } catch (e) {
    throw new Error(`Cannot load content from platformio.ini template file\n${e}\n`);
  }

  try {
    await fs.writeFileSync(userPlatformioIni, ini.stringify(config));
  } catch (e) {
    throw new Error(`Cannot write new content to platformio.ini file\n${e}\n`);
  }
};

const compileCode = (socket, data) => {
  prepareFiles(data).then((prepared) => {
    const cdRet = shell.cd(tasmotaRepo);

    if (cdRet.code !== 0) {
      socket.emit('message', cdRet.stderr);
      socket.emit('finished', { status: cdRet.code, message: cdRet.stderr });
      debug(cdRet.stderr);
      return;
    }

    const child = shell.exec('pio run', { silent: true, async: true });

    child.on('exit', (code, signal) => {
      const message = `Finished. Exit code: ${code}.\n`;
      socket.emit('message', message);
      socket.emit('finished', { ok: code === 0 });
      debug(message);
    });

    child.stderr.on('data', (stderrData) => {
      socket.emit('message', stderrData);
      debug(stderrData);
    });

    child.stdout.on('data', (stdoutData) => {
      socket.emit('message', stdoutData);
      debug(stdoutData);
    });
  }).catch((e) => {
    socket.emit('message', e.message);
    socket.emit('finished', { ok: false });
    debug(e);
  });
};


module.exports = { compileCode };
