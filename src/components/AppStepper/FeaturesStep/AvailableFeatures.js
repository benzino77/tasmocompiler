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
      name: 'USE_TIMERS',
      value: true,
      description: 'Timers',
    },
    {
      name: 'USE_RULES',
      value: true,
      description: 'Rules',
      tooltip: 'Rules exclude the use of scripts',
      exclude: [ 'USE_SCRIPT', ],
    },
    {
      name: 'USE_SCRIPT',
      value: false,
      description: 'Script support',
      tooltip: 'Script excludes the use of rules',
      exclude: [ 'USE_RULES', ],
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
      description: 'Basic IR support',
      tooltip: 'Basic infrared support (smaller binary and memmory usage). Exclude the use of full inrared support.',
      exclude: [ 'USE_IR_REMOTE_FULL', ],
    },
    {
      name: 'USE_IR_REMOTE_FULL',
      value: false,
      description: 'Full IR support',
      tooltip: 'Full infrared support (biger binary and memmory usage). Exclude the use of basic infrared support.',
      exclude: [ 'USE_IR_REMOTE', ],
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
    {
      name: 'USE_WEBSERVER',
      value: true,
      description: 'Web GUI',
      tooltip: 'For most users this should be enabled. Disable in case you need smaller binary and less memmory usage. If disabled, interaction with Tasmota will only be possible via MQTT broker.',
    },
    {
      name: 'USE_MQTT_TLS',
      value: false,
      description: 'MQTT over TLS',
      tooltip: 'This feature will work with version 6.6.0.9 or later (latest development).'
    },

]

export default availableFeatures;
