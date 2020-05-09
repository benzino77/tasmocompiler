const path = require('path');

const WORKDIR = process.env.WORKDIR || '/tmp';
const tasmotaRepo = path.resolve(WORKDIR, 'Tasmota');
const githubRepo = 'https://github.com/arendst/Tasmota.git';
const edgeBranch = 'development';
const userConfigOvewrite = path.resolve(tasmotaRepo, 'tasmota/user_config_override.h');
const userPlatformioIni = path.resolve(tasmotaRepo, 'platformio.ini');
const tasmotaVersionFile = path.resolve(tasmotaRepo, 'tasmota/tasmota_version.h');
const templatePlatformioIni = path.resolve(__dirname, '../compile/platformio.ini');
const listenPort = process.env.PORT || 3000;

module.exports = {
  tasmotaRepo,
  githubRepo,
  edgeBranch,
  userConfigOvewrite,
  userPlatformioIni,
  tasmotaVersionFile,
  templatePlatformioIni,
  listenPort,
};
