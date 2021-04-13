const generic = [
  {
    name: 'USE_TASMOTA_CLIENT',
    value: false,
    show: true,
    description: 'stepFeaturesArduinoSlaveDesc',
    tooltip: 'stepFeaturesArduinoSlaveTooltip',
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'alexa',
    value: false,
    show: true,
    description: 'stepFeaturesAlexaDesc',
    group: ['USE_EMULATION', 'USE_EMULATION_HUE', 'USE_EMULATION_WEMO'],
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'USE_ADC_VCC',
    value: false,
    show: true,
    description: 'stepFeaturesDispVccDesc',
    tooltip: 'stepFeaturesDispVccTooltip',
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'USE_DOMOTICZ',
    value: false,
    show: true,
    description: 'stepFeaturesDomoticzDesc',
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'USE_HOME_ASSISTANT',
    value: false,
    show: true,
    description: 'stepFeaturesHomeAssistantDesc',
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'USE_KNX',
    value: false,
    show: true,
    description: 'stepFeaturesKNXDesc',
    include: ['USE_ENERGY_SENSOR'],
    boards: ['all'],
    type: 'generic',
  },
  // this IR support one is deprecated
  {
    name: 'USE_IR_REMOTE',
    value: false,
    show: false,
    description: 'stepFeaturesIRBasicDesc',
    tooltip: 'stepFeaturesIRBasicTooltip',
    exclude: ['USE_IR_REMOTE_FULL'],
    platformio_entries: {
      build_flags: '-D_IR_ENABLE_DEFAULT_=false',
    },
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'USE_IR_REMOTE_FULL',
    value: false,
    show: true,
    description: 'stepFeaturesIRFullDesc',
    tooltip: 'stepFeaturesIRFullTooltip',
    exclude: ['USE_IR_REMOTE'],
    platformio_entries: {
      // eslint-disable-next-line
      build_flags: '${irremoteesp_full.build_flags}',
    },
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'USE_DISCOVERY',
    value: false,
    show: true,
    description: 'stepFeaturesMDNSDesc',
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'USE_MQTT_TLS',
    value: false,
    show: true,
    description: 'stepFeaturesMQTTTLSDesc',
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'USE_RC_SWITCH',
    value: false,
    show: true,
    description: 'stepFeaturesRFTransceiverDesc',
    tooltip: 'stepFeaturesRFTransceiverTooltip',
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'USE_TIMERS',
    value: true,
    show: true,
    description: 'stepFeaturesTimersDesc',
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'USE_TUYA_MCU',
    value: false,
    show: true,
    description: 'stepFeaturesTuyaMCUDesc',
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'USE_UFILESYS',
    value: false,
    show: true,
    description: 'stepFeaturesUFSDesc',
    tooltip: 'stepFeaturesUFSTooltip',
    boards: ['all'],
  },
  {
    name: 'USE_WEBSERVER',
    value: true,
    show: true,
    description: 'stepFeaturesWebInterfaceDesc',
    tooltip: 'stepFeaturesWebInterfaceTooltip',
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'USE_WS2812',
    value: false,
    show: true,
    description: 'stepFeaturesWS2812Desc',
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'USE_ZIGBEE',
    value: false,
    show: true,
    description: 'stepFeaturesZigbeeDesc',
    tooltip: 'stepFeaturesZigbeeTooltip',
    custom:
      '//Note: USE_ZIGBEE_ZNP and USE_ZIGBEE_EZSP are mutually incompatible, you must select exactly one\n\n' +
      '// Enable ZNP protocol, needed for CC2530 based devices\n' +
      '#define USE_ZIGBEE_ZNP\n' +
      '// Enable EZSP protocol, needed for EFR32 EmberZNet based devices, like Sonoff Zigbee bridge\n' +
      '//#define USE_ZIGBEE_EZSP\n' +
      '//#ifdef USE_ZIGBEE_ZNP\n' +
      '//  #undef USE_ZIGBEE_ZNP\n' +
      '//#endif\n\n' +
      '#define USE_ZIGBEE_CHANNEL  11  // Zigbee Channel (11-26)\n' +
      '#define USE_ZIGBEE_TXRADIO_DBM  20  // Tx Radio power in dBm (only for EZSP, EFR32 can go up to 20 dBm)\n' +
      '#define USE_ZIGBEE_COALESCE_ATTR_TIMER 350  // timer to coalesce attribute values (in ms)\n' +
      '#define USE_ZIGBEE_MODELID      "Tasmota Z2T"// reported "ModelId"      (cluster 0000 / attribute 0005)\n' +
      '#define USE_ZIGBEE_MANUFACTURER "Tasmota"  // reported "Manufacturer" (cluster 0000 / attribute 0004)\n' +
      '#define USE_ZBBRIDGE_TLS // TLS support for zbbridge\n' +
      '#define USE_ZIGBEE_ZBBRIDGE_EEPROM 0x50  // I2C id for the ZBBridge EEPROM\n',
    boards: ['esp8266', 'esp32', 'esp32webcam', 'esp32odroid-go', 'esp32m5'],
    type: 'generic',
  },
  {
    name: 'rules',
    value: true,
    show: true,
    description: 'stepFeaturesRulesDesc',
    tooltip: 'stepFeaturesRulesTooltip',
    exclude: ['USE_SCRIPT'],
    group: ['USE_RULES', 'USE_EXPRESSION', 'SUPPORT_IF_STATEMENT', 'USE_UNISHOX_COMPRESSION'],
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'USE_SCRIPT',
    value: false,
    show: true,
    description: 'stepFeaturesScriptDesc',
    tooltip: 'stepFeaturesScriptTooltip',
    exclude: ['rules'],
    boards: ['all'],
    type: 'generic',
  },
  {
    name: 'gpioexpanders',
    value: false,
    show: true,
    description: 'stepFeaturesIOExpMCPDesc',
    tooltip: 'stepFeaturesIOExpMCPTooltip',
    group: ['USE_MCP230xx', 'USE_MCP230xx_OUTPUT', 'USE_MCP230xx_DISPLAYOUTPUT'],
    include: ['USE_I2C'],
    custom: '#define USE_MCP230xx_ADDR 0x20\n',
    boards: ['all'],
    type: 'generic',
  },
];

export default generic
