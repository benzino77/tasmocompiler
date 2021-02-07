const distanceSensors = [
  {
    name: 'USE_SR04',
    value: false,
    show: true,
    description: 'stepFeaturesSR04',
    include: ['USE_I2C'],
    boards: ['all'],
    type: 'distance',
  },
  {
    name: 'USE_VL53L0X',
    value: false,
    show: true,
    description: 'stepFeaturesVL53L0X',
    include: ['USE_I2C'],
    boards: ['all'],
    type: 'distance',
  },
  {
    name: 'USE_HRXL',
    value: false,
    show: true,
    description: 'stepFeaturesHRXL',
    include: ['USE_I2C'],
    boards: ['all'],
    type: 'distance',
  },
  {
    name: 'USE_DYP',
    value: false,
    show: true,
    description: 'stepFeaturesDYP',
    include: ['USE_I2C'],
    boards: ['all'],
    type: 'distance',
  },
  {
    name: 'USE_VL53L1X',
    value: false,
    show: true,
    description: 'stepFeaturesVL53L1X',
    include: ['USE_I2C'],
    boards: ['all'],
    type: 'distance',
  },
];

export default distanceSensors;
