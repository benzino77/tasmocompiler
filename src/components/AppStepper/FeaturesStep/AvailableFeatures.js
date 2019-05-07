const availableFeatures = [
    {
      name: 'USE_DOMOTICZ',
      value: true,
      description: 'Domoticz',
    },
    {
      name: 'USE_HOME_ASSISTANT',
      value: true,
      description: 'Home Assistant',
    },
    {
      name: 'USE_KNX',
      value: false,
      description: 'KNX',
    },
    {
      name: 'USE_DISCOVERY',
      value: false,
      description: 'mDNS discovery',
    },
    {
      name: 'USE_TIMESRS',
      value: true,
      description: 'Timers',
    },
    {
      name: 'USE_RULES',
      value: true,
      description: 'Rules',
    },
    {
      name: 'USE_ADC_VCC',
      value: true,
      description: 'Display Vcc',
    },
    {
      name: 'USE_I2C',
      value: true,
      description: 'I2C sensors',
    },
    {
      name: 'USE_SPI',
      value: false,
      description: 'Display support',
    },
    {
      name: 'airsensors',
      value: true,
      description: 'Air/gas sensors',
      group: [ 'USE_MHZ19', 'USE_SENSEAIR', 'USE_PMS5003', 'USE_NOVA_SDS' ],
    },
    {
      name: 'energysensors',
      value: true,
      description: 'Energy sensors',
      group: [ 'USE_PZEM004T', 'USE_PZEM_AC', 'USE_PZEM_DC', 'USE_MCP39F501' ],
    },
    {
      name: 'USE_IR_REMOTE',
      value: true,
      description: 'Infrared support',
    },
    {
      name: 'USE_WS2812',
      value: true,
      description: 'WS2812 support',
    },
    {
      name: 'USE_SR04',
      value: true,
      description: 'Ultrasonic sensor',
    },
    {
      name: 'USE_RC_SWITCH',
      value: true,
      description: 'RcSwitch support',
    },

]

export default availableFeatures;
