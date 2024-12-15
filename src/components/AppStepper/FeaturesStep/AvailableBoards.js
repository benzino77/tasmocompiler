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
    platformio_env_name: 'tasmota',
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
    platformio_env_name: 'tasmota4M',
    tooltip: 'stepFeaturesBoard82664MTooltip',
    include_features: ['ufilesys', 'rules'],
    exclude_features: [],
    defines: {},
  },
  {
    name: 'esp82662M',
    chip_type: 'esp8266',
    description: 'Shelly-type',
    default: true,
    show: true,
    platformio_entries: {
      board: 'esp8266_2M1M',
    },
    platformio_env_name: 'tasmota2M',
    tooltip: 'stepFeaturesBoard82662MTooltip',
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
      // eslint-disable-next-line
      build_flags: '${env.build_flags}',
    },
    platformio_env_name: 'tasmota-zbbridge',
    tooltip: '',
    include_features: ['USE_ADC_VCC', 'rules'],
    exclude_features: [],
    defines: {
      MODULE: 'SONOFF_ZB_BRIDGE',
      FALLBACK_MODULE: 'SONOFF_ZB_BRIDGE',
      SERIAL_LOG_LEVEL: 'LOG_LEVEL_NONE',
      USE_ARDUINO_OTA: false,
      USE_TASMOTA_DISCOVERY: true,
      UPGRADE_V8_MIN: true,
      // USE_ZBBRIDGE_TLS: true,
      USE_ENHANCED_GUI_WIFI_SCAN: false,
      USE_EMULATION_HUE: true,
      USE_EMULATION_WEMO: false,
      USE_CUSTOM: false,
      USE_DISCOVERY: false,
      ROTARY_V1: false,
      USE_SONOFF_RF: false,
      USE_RF_FLASH: false,
      USE_SONOFF_SC: false,
      USE_TUYA_MCU: false,
      USE_PS_16_DZ: false,
      USE_SONOFF_IFAN: false,
      USE_BUZZER: false,
      USE_ARILUX_RF: false,
      USE_SHUTTER: false,
      USE_DEEPSLEEP: false,
      USE_EXS_DIMMER: false,
      USE_HOTPLUG: false,
      USE_DEVICE_GROUPS: false,
      USE_PWM_DIMMER: false,
      USE_PWM_DIMMER_REMOTE: false,
      USE_KEELOQ: false,
      USE_SONOFF_D1: false,

      USE_LIGHT: false,
      USE_LIGHT_VIRTUAL_CT: false,
      USE_WS2812: false,
      USE_MY92X1: false,
      USE_SM16716: false,
      USE_SM2135: false,
      USE_SONOFF_L1: false,
      USE_ELECTRIQ_MOODL: false,
      USE_LIGHT_PALETTE: false,
      USE_SHELLY_DIMMER: false,

      USE_COUNTER: false,
      USE_DS18x20: false,
      USE_SPI: false,
      USE_DISPLAY: false,
      USE_MHZ19: false,
      USE_SENSEAIR: false,
      USE_PMS5003: false,
      USE_NOVA_SDS: false,
      USE_HPMA: false,
      USE_SR04: false,
      USE_DYP: false,
      USE_SERIAL_BRIDGE: false,
      USE_MP3_PLAYER: false,
      USE_AZ7798: false,
      USE_PN532_HSU: false,
      USE_RDM6300: false,
      USE_IBEACON: false,
      USE_GPS: false,
      USE_HM10: false,
      USE_BLE_ESP32: false,
      USE_MI_ESP32: false,
      USE_HRXL: false,
      USE_TASMOTA_CLIENT: false,
      USE_OPENTHERM: false,
      USE_MIEL_HVAC: false,
      USE_PROJECTOR_CTRL: false,

      USE_ENERGY_SENSOR: false,
      USE_ADE7953: false,
      USE_PZEM004T: false,
      USE_PZEM_AC: false,
      USE_PZEM_DC: false,
      USE_MCP39F501: false,
      USE_SDM72: false,
      USE_SDM120: false,
      USE_SDM230: false,
      USE_SDM630: false,
      USE_DDS2382: false,
      USE_DDSU666: false,
      USE_SOLAX_X1: false,
      USE_LE01MR: false,
      USE_TELEINFO: false,
      USE_IEM3000: false,
      USE_WE517: false,

      USE_DHT: false,
      USE_MAX31855: false,
      USE_MAX31865: false,
      USE_IR_REMOTE: false,

      USE_TM1638: false,
      USE_HX711: false,
      USE_TX20_WIND_SENSOR: false,
      USE_TX23_WIND_SENSOR: false,
      USE_WINDMETER: false,
      USE_RC_SWITCH: false,
      USE_RF_SENSOR: false,
      USE_HRE: false,
      USE_A4988_STEPPER: false,
      USE_THERMOSTAT: false,
      DEBUG_THEO: false,
      USE_DEBUG_DRIVER: false,

      USE_ZIGBEE: true,
      USE_ZIGBEE_ZNP: false,
      USE_ZIGBEE_EZSP: true,
      USE_ZIGBEE_EEPROM: true,
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
      // eslint-disable-next-line
      build_flags: '${env:tasmota32_base.build_flags}',
      // eslint-disable-next-line
      lib_extra_dirs: ['${env:tasmota32_base.lib_extra_dirs}'],
    },
    platformio_env_name: 'tasmota32',
    tooltip: '',
    include_features: ['berry', 'ufilesys', 'rules'],
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
      // eslint-disable-next-line
      'board_build.f_cpu': '240000000L',
      // eslint-disable-next-line
      build_flags: '${env:tasmota32_base.build_flags}',
      board: 'esp32-fix',
      // use the same lib_extra_dirs as base - this will cause webcam to be less "special"
      // eslint-disable-next-line
      lib_extra_dirs: ['${env:tasmota32_base.lib_extra_dirs}'],
    },
    platformio_env_name: 'tasmota32-webcam',
    tooltip: '',
    include_features: ['berry', 'ufilesys', 'rules'],
    exclude_features: [],
    defines: {
      USE_WEBCAM: true,
      USE_TASMOTA_DISCOVERY: true,
      ENABLE_RTSPSERVER: true,
      USE_MI_ESP32: false,
      CAMERA_MODEL_AI_THINKER: true,
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
      board: 'esp32-solo1',
      // eslint-disable-next-line
      lib_extra_dirs: ['${env:tasmota32_base.lib_extra_dirs}'],
      // eslint-disable-next-line
      lib_ignore: ['${env:tasmota32_base.lib_ignore}', 'Micro-RTSP', 'epdiy'],
    },
    platformio_env_name: 'tasmota32solo1',
    tooltip: '',
    include_features: ['berry', 'ufilesys', 'rules'],
    exclude_features: [],
    defines: {},
  },
  // C2
  {
    name: 'esp32c2',
    chip_type: 'esp32',
    description: 'ESP32 C2',
    default: false,
    show: true,
    platformio_entries: {
      extends: 'env:tasmota32_base',
      board: 'esp32c2',
      build_unflags:
        // eslint-disable-next-line
        '${env:tasmota32_base.build_unflags} -mno-target-align',
      build_flags:
        // eslint-disable-next-line
        '${env:tasmota32_base.build_flags}',
      // eslint-disable-next-line
      lib_extra_dirs: ['${env:tasmota32_base.lib_extra_dirs}'],
    },
    platformio_env_name: 'tasmota32c2',
    tooltip: '',
    include_features: ['berry', 'ufilesys', 'rules'],
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
      build_unflags:
        // eslint-disable-next-line
        '${env:tasmota32_base.build_unflags} -mno-target-align',
      build_flags:
        // eslint-disable-next-line
        '${env:tasmota32_base.build_flags}',
      // eslint-disable-next-line
      lib_extra_dirs: ['${env:tasmota32_base.lib_extra_dirs}'],
    },
    platformio_env_name: 'tasmota32c3',
    tooltip: '',
    include_features: ['berry', 'ufilesys', 'rules'],
    exclude_features: [],
    defines: {},
  },
  // C6
  {
    name: 'esp32c6',
    chip_type: 'esp32',
    description: 'ESP32 C6',
    default: false,
    show: true,
    platformio_entries: {
      extends: 'env:tasmota32_base',
      board: 'esp32c6',
      build_unflags:
        // eslint-disable-next-line
        '${env:tasmota32_base.build_unflags} -mno-target-align',
      build_flags:
        // eslint-disable-next-line
        '${env:tasmota32_base.build_flags}',
    },
    platformio_env_name: 'tasmota32c6',
    tooltip: '',
    include_features: ['berry', 'ufilesys', 'rules'],
    exclude_features: [],
    defines: {},
  },
  // ESP32 S2
  {
    name: 'esp32s2',
    chip_type: 'esp32',
    description: 'ESP32 S2',
    default: false,
    show: true,
    platformio_entries: {
      extends: 'env:tasmota32_base',
      board: 'esp32s2',
      // eslint-disable-next-line
      build_flags: '${env:tasmota32_base.build_flags}',
      // eslint-disable-next-line
      lib_extra_dirs: ['${env:tasmota32_base.lib_extra_dirs}'],
      // eslint-disable-next-line
      lib_ignore: ['${env:tasmota32_base.lib_ignore}', 'epdiy', 'Micro-RTSP'],
    },
    platformio_env_name: 'tasmota32s2',
    tooltip: '',
    include_features: ['berry', 'ufilesys', 'rules'],
    exclude_features: [],
    defines: {},
  },
  // ESP32 S3
  {
    name: 'esp32s3',
    chip_type: 'esp32',
    description: 'ESP32 S3',
    default: false,
    show: true,
    platformio_entries: {
      extends: 'env:tasmota32_base',
      board: 'esp32s3-qio_qspi',
      // eslint-disable-next-line
      build_flags: '${env:tasmota32_base.build_flags}',
      // eslint-disable-next-line
      lib_extra_dirs: ['${env:tasmota32_base.lib_extra_dirs}'],
      // eslint-disable-next-line
      lib_ignore: ['${env:tasmota32_base.lib_ignore}', 'Micro-RTSP', 'epdiy'],
    },
    platformio_env_name: 'tasmota32s3',
    tooltip: '',
    include_features: ['berry', 'ufilesys', 'rules'],
    exclude_features: [],
    defines: {},
  },
];

export { availableBoardChipTypes, availableBoards };
