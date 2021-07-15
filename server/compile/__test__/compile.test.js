const fsMock = require('fs-extra');
const { compileCode } = require('../compile');

describe('compile.js test', () => {
  describe('testing getImageName', () => {
    it('should return empty string if file with current image cannot be found', async (done) => {
      const define = await compileCode('socket', 'board');
      done();
    });
  });
});
