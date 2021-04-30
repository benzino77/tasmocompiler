const path = require('path');

const WORKDIR = process.env.WORKDIR || '/tmp';
const tasmotaRepo = path.resolve(WORKDIR, 'Tasmota');
const githubRepo = 'https://github.com/arendst/Tasmota.git';
const minVersion = 'v9.4.0';
const edgeBranch = 'development';
const userConfigOvewrite = path.resolve(
  tasmotaRepo,
  'tasmota/user_config_override.h'
);
const userPlatformioIni = path.resolve(tasmotaRepo, 'platformio.ini');
const userPlatformioOverrideIni = path.resolve(
  tasmotaRepo,
  'platformio_override.ini'
);
const tcSrcCoresIni = path.resolve(__dirname, '../compile/tc_cores.ini');
const tcDestCoresIni = path.resolve(tasmotaRepo, 'tc_cores.ini');
const tasmotaVersionFile = path.resolve(
  tasmotaRepo,
  'tasmota/tasmota_version.h'
);
const templatePlatformioIni = path.resolve(
  __dirname,
  '../compile/platformio.ini'
);
const tasmotaInoFile = path.resolve(tasmotaRepo, 'tasmota/tasmota.ino');
const listenPort = process.env.PORT || 3000;

module.exports = {
  tasmotaRepo,
  githubRepo,
  minVersion,
  edgeBranch,
  userConfigOvewrite,
  userPlatformioIni,
  userPlatformioOverrideIni,
  tcSrcCoresIni,
  tcDestCoresIni,
  tasmotaVersionFile,
  templatePlatformioIni,
  tasmotaInoFile,
  listenPort,
};
