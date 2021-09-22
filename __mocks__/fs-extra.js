const fs = jest.genMockFromModule('fs-extra');

let fsStatReject = true;
let fsRemoveReject = true;
let retFsPathExistsSync = false;

function __setFsStatReject(reject) {
  fsStatReject = reject;
}

function __setFsRemoveReject(reject) {
  fsRemoveReject = reject;
}

function __setRetFsPathExistsSync(value) {
  retFsPathExistsSync = value;
}

fs.__setFsStatReject = __setFsStatReject;
fs.__setFsRemoveReject = __setFsRemoveReject;
fs.__setRetFsPathExistsSync = __setRetFsPathExistsSync;

fs.stat = jest.fn((path) => {
  if (fsStatReject) {
    return Promise.reject();
  }
  return Promise.resolve();
});

fs.remove = jest.fn((path) => {
  if (fsRemoveReject) return Promise.reject();
  return Promise.resolve();
});

fs.pathExistsSync = jest.fn((path) => {
  return retFsPathExistsSync;
});

module.exports = fs;
