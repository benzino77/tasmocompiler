const fsMock = require('fs-extra');
const { compileCode } = require('../compile');
const { minVersion } = require('../../config/config');

const testData = {
  version: { tasmotaVersion: minVersion },
};

const socket = {
  emit: jest.fn(),
};

describe('compile.js test', () => {
  describe('testing compileCode', () => {
    beforeEach(() => {
      fsMock.writeFile.mockClear();
      socket.emit.mockClear();
    });

    it('should throw an error on writeFile fail', async (done) => {
      fsMock.__setFsWriteFileReject(true);
      await compileCode(socket, testData);

      expect(socket.emit).toBeCalledTimes(2);
      expect(socket.emit).toHaveBeenNthCalledWith(2, 'finished', { ok: false });
      done();
    });
  });
});
