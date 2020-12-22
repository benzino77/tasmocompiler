const path = require('path');
const fs = require('fs-extra');

const WORKDIR = process.env.WORKDIR || '/tmp';
const buildsFile = path.resolve(WORKDIR, 'Tasmota/BUILDS.md');

const buildVersions = [
  {
    name: 'TasmoCompiler',
    value: 'tasmocompiler',
    desc: 'TasmoCompiler default version.',
    contains: ['rules', 'USE_TIMERS', 'USE_WEBSERVER']
  },
  {
    name: 'Minimal',
    value: 'tasmota-minimal',
    desc: 'The Minimal version allows intermediate OTA uploads to support larger versions and does NOT change any persistent parameter. This version should NOT be used for initial installation.',
    contains: []
  },
  {
    name: 'Lite',
    value: 'tasmota-lite',
    desc: 'The Lite version without most drivers and sensors.',
    contains: []
  },
  {
    name: 'Tasmota',
    value: 'tasmota',
    desc: 'The Tasmota version with most drivers. RECOMMENDED RELEASE BINARY.',
    contains: []
  },
  {
    name: 'KNX',
    value: 'tasmota-knx',
    desc: 'The Knx version without some features but adds KNX support.',
    contains: []
  },
  {
    name: 'Sensors',
    value: 'tasmota-sensors',
    desc: 'The Sensors version adds more useful sensors.',
    contains: []
  },
  {
    name: 'IR',
    value: 'tasmota-ir',
    desc: 'The InfraRed Receiver and transmitter version allowing all available protocols provided by library IRremoteESP8266 but without most other features.',
    contains: []
  },
  {
    name: 'Display',
    value: 'tasmota-display',
    desc: 'The Display version without Energy Monitoring but adds display support.',
    contains: []
  },
  {
    name: 'ZBBridge',
    value: 'tasmota-zbbridge',
    desc: 'The dedicated Sonoff Zigbee Bridge version.',
    contains: ['USE_ZIGBEE'] // ZBBridge build missing from BUILDS.md
  },
  {
    name: 'Custom selection',
    value: 'tasmota-custom',
    desc: 'Custom selection.',
    contains: []
  }
];

let buildVersionsProcessed = false;

const getBuildVersions = async () => {
  if (!buildVersionsProcessed) {
    const versions =['tasmocompiler', 'tasmota-minimal', 'tasmota-lite', 'tasmota', 'tasmota-knx', 'tasmota-sensors', 'tasmota-ir', 'tasmota-display', 'tasmota-zbbridge'];
    const buildsFileString = fs.readFileSync(buildsFile, {encoding: 'utf8', flag: 'r'});
    const filter1 = buildsFileString.match(/##(.*)##/gs); // filter for ESP8266 only
    const filter2 = filter1[0].match(/\| (.*) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \|/gm); // filter table lines
    filter2.forEach(item => {
      const flagArr = {}
      const flag = item.match(/\|(.*?)\|/)[1].trim();
      if (!flag.startsWith('MY_LANGUAGE')) { // MY_LANGUAGE defined later in workflow
        flagArr['name'] = flag;
        const builds = item.match(/\| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \| (-|x) \|/);
        const versionsArr = [];
        for (var i = 0; i <= 8; i++) {
          if (builds[i] == 'x') {
            versionsArr.push(versions[i]);
            buildVersions[i].contains.push(flag);
          }
        }
      }
    });
    buildVersionsProcessed = true;
  }

  return buildVersions;
}

module.exports = { getBuildVersions };
