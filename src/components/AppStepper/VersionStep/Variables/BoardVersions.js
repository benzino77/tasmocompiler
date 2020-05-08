const boardVersions = [
  {
    name: 'Sonoff (1MB)',
    // value: { mem_suffix: '.flash.1m0.ld', board: 'esp01_1m' },
    value: { mem: 1, board: 'esp01_1m' },
  },
  {
    name: 'NodeMCU (4MB)',
    // value: {mem_suffix: '.flash.4m1m.ld', board: 'nodemcuv2'},
    value: { mem: 4, board: 'nodemcuv2' },
  },
  {
    name: 'Wemos D1 Mini (4MB)',
    // value: {mem_suffix: '.flash.4m1m.ld', board: 'd1_mini'},
    value: { mem: 4, board: 'd1_mini' },
  },
];

export default boardVersions;
