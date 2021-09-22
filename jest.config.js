const path = require('path');

module.exports = {
  verbose: true,
  collectCoverage: true,
  setupFiles: [path.resolve(__dirname, 'jestSetEnv.js')],
};
