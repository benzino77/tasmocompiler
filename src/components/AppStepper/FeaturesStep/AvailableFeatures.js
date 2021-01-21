const availableFeatures = [
  {
    name: 'airsensors',
    value: false,
    show: true,
    description: 'stepFeaturesAGDesc',
    group: [
      'USE_MHZ19',
      'USE_SENSEAIR',
      'USE_PMS5003',
      'USE_MGS',
      'USE_NOVA_SDS',
      'USE_SGP30',
      'USE_CCS811',
      'USE_SCD30',
      'USE_SPS30',
      'USE_HPMA',
      'USE_IAQ',
    ],
    include: ['USE_I2C'],
  },
  {
    name: 'alexa',
    value: false,
    show: true,
    description: 'stepFeaturesAlexaDesc',
    group: ['USE_EMULATION', 'USE_EMULATION_HUE', 'USE_EMULATION_WEMO'],
  },
  {
    name: 'USE_TASMOTA_CLIENT',
    value: false,
    show: true,
    description: 'stepFeaturesArduinoSlaveDesc',
    tooltip: 'stepFeaturesArduinoSlaveTooltip',
  },
  {
    name: 'displays',
    value: false,
    show: true,
    description: 'stepFeaturesDisplaysDesc',
    tooltip: 'stepFeaturesDisplaysTooltip',
    group: [
      'USE_DISPLAY',
      'USE_DISPLAY_MODES1TO5',
      'USE_DISPLAY_LCD',
      'USE_DISPLAY_SSD1306',
      'USE_DISPLAY_MATRIX',
      'USE_DISPLAY_ILI9341',
      'USE_DISPLAY_EPAPER_29',
      'USE_DISPLAY_EPAPER_42',
      'USE_DISPLAY_SH1106',
      'USE_DISPLAY_ILI9488',
      'USE_DISPLAY_SSD1351',
      'USE_DISPLAY_RA8876',
      'USE_DISPLAY_SEVENSEG',
      'USE_DISPLAY_ST7789',
      'USE_DISPLAY_SSD1331',
    ],
    include: ['USE_SPI', 'USE_I2C'],
    custom:
      '#define MTX_ADDRESS1     0x71              // [DisplayAddress1] I2C address of first 8x8 matrix module\n' +
      '#define MTX_ADDRESS2     0x74              // [DisplayAddress2] I2C address of second 8x8 matrix module\n' +
      '#define MTX_ADDRESS3     0x75              // [DisplayAddress3] I2C address of third 8x8 matrix module\n' +
      '#define MTX_ADDRESS4     0x72              // [DisplayAddress4] I2C address of fourth 8x8 matrix module\n' +
      '#define MTX_ADDRESS5     0x73              // [DisplayAddress5] I2C address of fifth 8x8 matrix module\n' +
      '#define MTX_ADDRESS6     0x76              // [DisplayAddress6] I2C address of sixth 8x8 matrix module\n' +
      '#define MTX_ADDRESS7     0x00              // [DisplayAddress7] I2C address of seventh 8x8 matrix module\n' +
      '#define MTX_ADDRESS8     0x00              // [DisplayAddress8] I2C address of eigth 8x8 matrix module\n',
  },
  {
    name: 'USE_ADC_VCC',
    value: false,
    show: true,
    description: 'stepFeaturesDispVccDesc',
    tooltip: 'stepFeaturesDispVccTooltip',
  },
  {
    name: 'USE_DOMOTICZ',
    value: false,
    show: true,
    description: 'stepFeaturesDomoticzDesc',
  },
  {
    name: 'energysensors',
    value: false,
    show: true,
    description: 'stepFeaturesEnergyDesc',
    group: [
      'USE_ENERGY_SENSOR',
      'USE_HLW8012',
      'USE_CSE7766',
      'USE_PZEM004T',
      'USE_MCP39F501',
      'USE_PZEM_AC',
      'USE_PZEM_DC',
      'USE_ADE7953',
      'USE_SDM120',
      'USE_DDS2382',
      'USE_SDM630',
      'USE_DDSU666',
      'USE_SOLAX_X1',
      'USE_LE01MR',
      'USE_BL0940',
      'USE_TELEINFO',
      'USE_IEM3000',
      'USE_WE517',
    ],
    include: ['USE_I2C'],
  },
  {
    name: 'temphumpressensors',
    value: false,
    show: true,
    description: 'stepFeaturesTempHumDesc',
    group: [
      'USE_SONOFF_SC',
      'USE_DS18x20',
      'USE_DHT',
      'USE_SHT',
      'USE_HTU',
      'USE_BMP',
      'USE_SHT3X',
      'USE_LM75AD',
      'USE_APDS9960',
      'USE_AZ7798',
      'USE_MAX31855',
      'USE_MLX90614',
      'USE_MAX31865',
      'USE_HIH6',
      'USE_DHT12',
      'USE_DS1624',
      'USE_AHT1x',
      'USE_HDC1080',
      'USE_MCP9808',
      'USE_HP303B',
      'USE_LMT01',
    ],
    include: ['USE_I2C'],
  },
  {
    name: 'USE_HOME_ASSISTANT',
    value: false,
    show: true,
    description: 'stepFeaturesHomeAssistantDesc',
  },
  {
    name: 'gpioexpanders',
    value: false,
    show: true,
    description: 'stepFeaturesIOExpMCPDesc',
    tooltip: 'stepFeaturesIOExpMCPTooltip',
    group: [
      'USE_MCP230xx',
      'USE_MCP230xx_OUTPUT',
      'USE_MCP230xx_DISPLAYOUTPUT',
    ],
    include: ['USE_I2C'],
    custom: '#define USE_MCP230xx_ADDR 0x20\n',
  },
  {
    name: 'USE_KNX',
    value: false,
    show: true,
    description: 'stepFeaturesKNXDesc',
    include: ['energysensors'],
  },
  {
    name: 'USE_IR_REMOTE',
    value: false,
    show: true,
    description: 'stepFeaturesIRBasicDesc',
    tooltip: 'stepFeaturesIRBasicTooltip',
    exclude: ['USE_IR_REMOTE_FULL'],
    buildflag: '-D_IR_ENABLE_DEFAULT_=false',
  },
  {
    name: 'USE_IR_REMOTE_FULL',
    value: false,
    show: true,
    description: 'stepFeaturesIRFullDesc',
    tooltip: 'stepFeaturesIRFullTooltip',
    exclude: ['USE_IR_REMOTE'],
    buildflag:
      '-U_IR_ENABLE_DEFAULT_ -DDECODE_PRONTO=false -DSEND_PRONTO=false',
  },
  {
    name: 'USE_DISCOVERY',
    value: false,
    show: true,
    description: 'stepFeaturesMDNSDesc',
  },
  {
    name: 'USE_MQTT_TLS',
    value: false,
    show: true,
    description: 'stepFeaturesMQTTTLSDesc',
    tooltip: 'stepFeaturesMQTTTLSTooltip',
  },
  {
    name: 'USE_RC_SWITCH',
    value: false,
    show: true,
    description: 'stepFeaturesRFTransceiverDesc',
    tooltip: 'stepFeaturesRFTransceiverTooltip',
  },
  {
    name: 'rules',
    value: true,
    show: true,
    description: 'stepFeaturesRulesDesc',
    tooltip: 'stepFeaturesRulesTooltip',
    exclude: ['USE_SCRIPT'],
    group: ['USE_RULES', 'USE_EXPRESSION', 'SUPPORT_IF_STATEMENT'],
  },
  {
    name: 'USE_SCRIPT',
    value: false,
    show: true,
    description: 'stepFeaturesScriptDesc',
    tooltip: 'stepFeaturesScriptTooltip',
    exclude: ['rules'],
  },
  {
    name: 'USE_TIMERS',
    value: true,
    show: true,
    description: 'stepFeaturesTimersDesc',
  },
  {
    name: 'USE_TUYA_MCU',
    value: false,
    show: true,
    description: 'stepFeaturesTuyaMCUDesc',
  },
  {
    name: 'distance',
    value: false,
    show: true,
    description: 'stepFeaturesDistanceDesc',
    group: ['USE_SR04', 'USE_VL53L0X', 'USE_HRXL', 'USE_DYP', 'USE_VL53L1X'],
    include: ['USE_I2C'],
  },
  {
    name: 'USE_WEBSERVER',
    value: true,
    show: true,
    description: 'stepFeaturesWebInterfaceDesc',
    tooltip: 'stepFeaturesWebInterfaceTooltip',
  },
  {
    name: 'USE_WS2812',
    value: false,
    show: true,
    description: 'stepFeaturesWS2812Desc',
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
  },
  {
    name: 'USE_I2C',
    value: false,
    show: false,
    description: 'stepFeaturesI2CDesc',
  },
  {
    name: 'USE_SPI',
    value: false,
    show: false,
    description: 'stepFeaturesSPIDesc',
  },
];

export default availableFeatures;
