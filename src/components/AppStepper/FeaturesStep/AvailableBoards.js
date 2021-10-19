const availableBoardChipTypes = [
  { name: 'esp8266', description: '', tooltip: '' },
  { name: 'esp32', description: '', tooltip: '' },
];

const availableBoards = [
  {
    name: 'esp8266generic',
    chip_type: 'esp8266',
    description: 'Generic',
    default: true,
    show: true,
    platformio_entries: {},
    tooltip: 'stepFeaturesBoard8266Tooltip',
    include_features: ['rules'],
    exclude_features: [],
    defines: {},
  },
  {
    name: 'esp82664M',
    chip_type: 'esp8266',
    description: 'Wemos/NodeMCU',
    default: true,
    show: true,
    platformio_entries: {
      board: 'esp8266_4M2M',
    },
    tooltip: 'stepFeaturesBoard82664MTooltip',
    include_features: ['ufilesys', 'rules'],
    exclude_features: [],
    defines: {},
  },
  // zbbridge
  {
    name: 'zbbridge',
    chip_type: 'esp8266',
    description: 'SonOff Zigbee Bridge',
    default: false,
    show: true,
    platformio_entries: {
      board: 'esp8266_zbbridge',
    },
    tooltip: '',
    include_features: ['USE_ADC_VCC', 'rules'],
    exclude_features: [],
    defines: {
      MODULE: 'SONOFF_ZB_BRIDGE',
      FALLBACK_MODULE: 'SONOFF_ZB_BRIDGE',
      SERIAL_LOG_LEVEL: 'LOG_LEVEL_NONE',
      USE_ARDUINO_OTA: false,
      UPGRADE_V8_MIN: true,
      USE_ZBBRIDGE_TLS: true,
      USE_ENHANCED_GUI_WIFI_SCAN: false,
      USE_ZIGBEE: true,
      USE_ZIGBEE_ZNP: false,
      USE_ZIGBEE_EZSP: true,
      USE_TCP_BRIDGE: true,
      USE_ZIGBEE_CHANNEL: 11,
      USE_ZIGBEE_COALESCE_ATTR_TIMER: 350,
    },
  },
  // esp32
  {
    name: 'esp32generic',
    chip_type: 'esp32',
    description: 'Generic',
    default: false,
    show: true,
    platformio_entries: {
      extends: 'env:tasmota32_base',
    },
    tooltip: '',
    include_features: ['ufilesys', 'rules'],
    exclude_features: [],
    defines: {},
  },
  // esp32webcam
  {
    name: 'esp32webcam',
    chip_type: 'esp32',
    description: 'Webcam',
    default: false,
    show: true,
    platformio_entries: {
      extends: 'env:tasmota32_base',
      board: 'esp32-cam',
    },
    tooltip: '',
    include_features: ['ufilesys', 'rules'],
    exclude_features: [],
    defines: { USE_WEBCAM: true, ENABLE_RTSPSERVER: true },
  },
  // esp32odroid-go
  {
    name: 'esp32odroid-go',
    chip_type: 'esp32',
    description: 'Odroid-Go',
    default: false,
    show: true,
    platformio_entries: {
      extends: 'env:tasmota32_base',
      board: 'esp32-odroid',
    },
    tooltip: '',
    include_features: ['displays', 'ufilesys', 'rules'],
    exclude_features: [],
    defines: {
      MODULE: 'ODROID_GO',
      FALLBACK_MODULE: 'ODROID_GO',
      USE_ODROID_GO: true,
      USE_ADC: true,
    },
  },
  // esp32m5
  {
    name: 'esp32m5',
    chip_type: 'esp32',
    description: 'M5Stack Core2',
    default: false,
    show: true,
    platformio_entries: {
      extends: 'env:tasmota32_base',
      board: 'esp32-m5core2',
    },
    tooltip: '',
    include_features: ['displays', 'ufilesys', 'USE_SCRIPT'],
    exclude_features: [],
    defines: {
      MODULE: 'M5STACK_CORE2',
      FALLBACK_MODULE: 'M5STACK_CORE2',
      USE_M5STACK_CORE2: true,
      USE_I2S_SAY_TIME: true, // another new name for this feature
      USE_I2S_WEBRADIO: true, // new changed name
      USE_MPU6886: true,
      USE_BMA423: true,
      USE_MPU_ACCEL: true,
      SHOW_SPLASH: true,
      JPEG_PICTS: true,
      USE_FT5206: true,
      USE_LVGL: true,
      USE_LVGL_FREETYPE: true,
      USE_TOUCH_BUTTONS: true,
      USE_SENDMAIL: true,
      USE_ESP32MAIL: true,
    },
  },
  // solo1
  {
    name: 'esp32solo1',
    chip_type: 'esp32',
    description: 'Solo1',
    default: false,
    show: true,
    platformio_entries: {
      extends: 'env:tasmota32_base',
      platform_packages:
        '\tframework-arduinoespressif32 @ https://github.com/tasmota/arduino-esp32/releases/download/1.0.7.4/tasmota-arduinoespressif32-solo1-release_v3.3.5.tar.gz' +
        '\n\t\t\tplatformio/tool-esptoolpy @ ~1.30100' +
        '\n\t\t\tplatformio/tool-mklittlefs @ ~1.203.200522',
    },
    tooltip: '',
    include_features: ['ufilesys', 'rules'],
    exclude_features: [],
    defines: {},
  },
  // C3
  {
    name: 'esp32c3',
    chip_type: 'esp32',
    description: 'ESP32 C3',
    default: false,
    show: true,
    platformio_entries: {
      extends: 'env:tasmota32_base',
      board: 'esp32c3',
      platform:
        'https://github.com/platformio/platform-espressif32.git#feature/arduino-idf-master',
      platform_packages:
        '\tframework-arduinoespressif32 @ https://github.com/Jason2866/esp32-arduino-lib-builder/releases/download/464/framework-arduinoespressif32-master-3dde75d58.tar.gz' +
        '\n\t\t\tplatformio/tool-mklittlefs @ ~1.203.200522',
      build_unflags:
        // eslint-disable-next-line
        '\t${env:tasmota32_base.build_unflags}' +
        '\n\t-Wswitch-unreachable' +
        '\n\t-Wstringop-overflow' +
        '\n\t-Wincompatible-pointer-types' +
        '\n\t-mtarget-align' +
        '\n\t-DNDEBUG',
      build_flags:
        // eslint-disable-next-line
        '\t${env:tasmota32_base.build_flags}' +
        '\n\t-Wno-switch-unreachable' +
        '\n\t-Wno-stringop-overflow',
      lib_extra_dirs:
        // eslint-disable-next-line
        '\tlib/libesp32' +
        '\n\tlib/libesp32_div' +
        '\n\tlib/libesp32_lvgl' +
        '\n\tlib/lib_basic' +
        '\n\tlib/lib_i2c' +
        '\n\tlib/lib_ssl' +
        '\n\tlib/lib_display',
      lib_ignore:
        // eslint-disable-next-line
        '\tTTGO TWatch Library' + '\n\tESP32-HomeKit' + '\n\tMicro-RTSP',
    },
    tooltip: '',
    include_features: ['ufilesys', 'rules'],
    exclude_features: [],
    defines: {},
  },
];

export { availableBoardChipTypes, availableBoards };
