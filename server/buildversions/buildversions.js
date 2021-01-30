const path = require('path');
const fs = require('fs-extra');

const WORKDIR = process.env.WORKDIR || '/tmp';
const buildsFile = path.resolve(WORKDIR, 'Tasmota/BUILDS.md');

const buildVersions = [
  {
    name: 'TasmoCompiler',
    value: 'tasmocompiler',
    define: ['rules', 'USE_TIMERS', 'USE_WEBSERVER'],
    undef: []
  },
  {
    name: 'Minimal',
    value: 'tasmota-minimal',
    define: [],
    undef: []
  },
  {
    name: 'Lite',
    value: 'tasmota-lite',
    define: [],
    undef: []
  },
  {
    name: 'Tasmota',
    value: 'tasmota',
    define: [],
    undef: []
  },
  {
    name: 'KNX',
    value: 'tasmota-knx',
    define: [],
    undef: []
  },
  {
    name: 'Sensors',
    value: 'tasmota-sensors',
    define: [],
    undef: []
  },
  {
    name: 'IR',
    value: 'tasmota-ir',
    define: [],
    undef: []
  },
  {
    name: 'Display',
    value: 'tasmota-display',
    define: [],
    undef: []
  },
  {
    name: 'ZBBridge',
    value: 'tasmota-zbbridge',
    define: [], // ZBBridge build missing from BUILDS.md
    undef: []
  },
  {
    name: 'Custom selection',
    value: 'custom',
    define: [],
    undef: []
  }
];

let buildVersionsProcessed = false;

const getBuildVersions = async () => {
  if (!buildVersionsProcessed) {
    const buildsFileString = fs.readFileSync(buildsFile, {encoding: 'utf8', flag: 'r'});
    const filterESP8266 = buildsFileString.match(/##(.*)##/gs); // filter for ESP8266 only
    const tableRows = filterESP8266[0].match(/\| (.*) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \|/gm); // filter table rows without zbbridge
    tableRows.forEach(item => {
      const flagArr = {}
      let flag = item.match(/\|(.*?)\|/)[1].trim();
      // MY_LANGUAGE defined later in workflow
      if (flag.startsWith('MY_LANGUAGE')) {
        return;
      }
      //handle groups
      switch (flag) {
        case 'USE_RULES':
        case 'USE_EXPRESSION':
        case 'SUPPORT_IF_STATEMENT':
          flag = 'rules';
          break;
        case 'USE_MCP230xx':
        case 'USE_MCP230xx_OUTPUT':
        case 'USE_MCP230xx_DISPLAYOUTPUT':
          flag = 'gpioexpanders';
          break;
        case 'USE_ENERGY_SENSOR':
        case 'USE_PZEM004T':
        case 'USE_PZEM_AC':
        case 'USE_PZEM_DC':
        case 'USE_MCP39F501':
        case 'USE_SDM120':
        case 'USE_SDM630':
        case 'USE_DDS2382':
        case 'USE_DDSU666':
        case 'USE_SOLAX_X1':
        case 'USE_LE01MR':
          flag = 'energysensors';
          break;
        case 'USE_DISPLAY':
        case 'USE_DISPLAY_MODES1TO5':
        case 'USE_DISPLAY_LCD':
        case 'USE_DISPLAY_SSD1306':
        case 'USE_DISPLAY_MATRIX':
        case 'USE_DISPLAY_SH1106':
        case 'USE_DISPLAY_ILI9341':
        case 'USE_DISPLAY_EPAPER_29':
        case 'USE_DISPLAY_EPAPER_42':
        case 'USE_DISPLAY_ILI9488':
        case 'USE_DISPLAY_SSD1351':
        case 'USE_DISPLAY_RA8876':
          flag = 'displays';
          break;
        case 'USE_EMULATION':
        case 'USE_EMULATION_HUE':
        case 'USE_EMULATION_WEMO':
          flag = 'alexa';
          break;
        case 'USE_MHZ19':
        case 'USE_SENSEAIR':
        case 'USE_PMS5003':
        case 'USE_NOVA_SDS':
        case 'USE_HPMA':
          flag = 'airsensors';
          break;
      }

      flagArr['name'] = flag;
      const builds = item.match(/\| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \|/); // without zbbridge
      // fill tasmocompiler, zbbbridge, custom
      // dont add if already added and groups stay together in the define
      for (var i = 0; i <= 9; i++) {
        if (builds[i] == 'x') {
          if (buildVersions[i].define.indexOf(flag) == -1) {
            buildVersions[i].define.push(flag);
          }
        } else {
          if (buildVersions[i].undef.indexOf(flag) == -1 && buildVersions[i].define.indexOf(flag) == -1) {
            buildVersions[i].undef.push(flag);
          }
        }
      }
    });
    buildVersionsProcessed = true;
  }

  return buildVersions.filter(item => item.value != 'tasmota-zbbridge'); // without zbbridge
}

module.exports = { getBuildVersions };
