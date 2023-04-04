const helpers = jest.genMockFromModule('../helpers');
let version = '100';

function __setReturnVersion(v) {
  version = v;
}

const getTcVersion = jest.fn(() => {
  return version;
});

helpers.getTcVersion = getTcVersion;
helpers.__setReturnVersion = __setReturnVersion;

module.exports = helpers;
