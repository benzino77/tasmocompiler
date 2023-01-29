const packageJson = require('../../package.json');
function getTcVersion() {
  return packageJson.version;
}

module.exports = { getTcVersion };
