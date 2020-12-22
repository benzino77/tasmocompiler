const path = require('path');
const fs = require('fs-extra');

const WORKDIR = process.env.WORKDIR || '/tmp';
const buildsFile = path.resolve(WORKDIR, 'Tasmota/BUILDS.md');

const buildVersions = [
  {
    name: 'TasmoCompiler',
    value: 'tasmocompiler',
    contains: ['rules', 'USE_TIMERS', 'USE_WEBSERVER']
  },
  {
    name: 'Minimal',
    value: 'tasmota-minimal',
    contains: []
  },
  {
    name: 'Lite',
    value: 'tasmota-lite',
    contains: []
  },
  {
    name: 'Tasmota',
    value: 'tasmota',
    contains: []
  },
  {
    name: 'KNX',
    value: 'tasmota-knx',
    contains: []
  },
  {
    name: 'Sensors',
    value: 'tasmota-sensors',
    contains: []
  },
  {
    name: 'IR',
    value: 'tasmota-ir',
    contains: []
  },
  {
    name: 'Display',
    value: 'tasmota-display',
    contains: []
  },
  {
    name: 'ZBBridge',
    value: 'tasmota-zbbridge',
    contains: [] // ZBBridge build missing from BUILDS.md
  },
  {
    name: 'Custom selection',
    value: 'custom',
    contains: []
  }
];

let buildVersionsProcessed = false;

const getBuildVersions = async () => {
  if (!buildVersionsProcessed) {
    const versions =['tasmocompiler', 'tasmota-minimal', 'tasmota-lite', 'tasmota', 'tasmota-knx', 'tasmota-sensors', 'tasmota-ir', 'tasmota-display', 'tasmota-zbbridge'];
    const buildsFileString = fs.readFileSync(buildsFile, {encoding: 'utf8', flag: 'r'});
    const filterESP8266 = buildsFileString.match(/##(.*)##/gs); // filter for ESP8266 only
    const tableRows = filterESP8266[0].match(/\| (.*) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \|/gm); // filter table rows without zbbridge
    tableRows.forEach(item => {
      const flagArr = {}
      let flag = item.match(/\|(.*?)\|/)[1].trim();
      if (flag == 'USE_RULES') {
        flag = 'rules'; // include rules with expression and if statements
      }
      if (!flag.startsWith('MY_LANGUAGE')) { // MY_LANGUAGE defined later in workflow
        flagArr['name'] = flag;
        const builds = item.match(/\| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \|/); // without zbbridge
        for (var i = 0; i <= 8; i++) {
          if (builds[i] == 'x') {
            buildVersions[i].contains.push(flag);
          }
        }
      }
    });
    buildVersionsProcessed = true;
  }

  return buildVersions.filter(item => item.value != 'tasmota-zbbridge'); // without zbbridge
}

module.exports = { getBuildVersions };
