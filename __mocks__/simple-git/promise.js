let gitIsRepoRet = true;
let gitTagsReject = true;
let gitCloneReject = true;
let gitPullReject = true;
let gitResetReject = true;
let gitCleanReject = true;
let gitBranchLocalReject = true;
let gitCheckoutBranchReject = true;
let gitCheckoutReject = true;
let retTags = [];
let retLocalBranches = {};

function __setGitIsRepoRet(value) {
  gitIsRepoRet = value;
}

function __setRepoTags(tags) {
  retTags = tags;
}

function __setGitTagsReject(reject) {
  gitTagsReject = reject;
}

function __setGitCloneReject(reject) {
  gitCloneReject = reject;
}

function __setGitPullReject(reject) {
  gitPullReject = reject;
}

function __setGitResetReject(reject) {
  gitResetReject = reject;
}

function __setGitCleanReject(reject) {
  gitCleanReject = reject;
}

function __setGitBranchLocalReject(reject) {
  gitBranchLocalReject = reject;
}

function __setLocalBranches(branches) {
  retLocalBranches = branches;
}

function __setGitCheckoutBranchReject(reject) {
  gitCheckoutBranchReject = reject;
}

function __setGitCheckoutReject(reject) {
  gitCheckoutReject = reject;
}

const gitObject = {
  checkIsRepo: jest.fn(() => Promise.resolve(gitIsRepoRet)),
  tags: jest.fn(() => {
    if (gitTagsReject) return Promise.reject();
    return Promise.resolve({ all: retTags });
  }),
  clone: jest.fn((source, dest) => {
    if (gitCloneReject) return Promise.reject();

    return Promise.resolve();
  }),
  pull: jest.fn(() => {
    if (gitPullReject) return Promise.reject();
    return Promise.resolve();
  }),
  reset: jest.fn((type) => {
    if (gitResetReject) return Promise.reject();
    return Promise.resolve();
  }),
  clean: jest.fn((opts) => {
    if (gitCleanReject) return Promise.reject();
    return Promise.resolve();
  }),
  branchLocal: jest.fn(() => {
    if (gitBranchLocalReject) return Promise.reject();
    return Promise.resolve({ branches: retLocalBranches });
  }),
  checkoutBranch: jest.fn((remote, local) => {
    if (gitCheckoutBranchReject) return Promise.reject();
    return Promise.resolve();
  }),
  checkout: jest.fn(() => {
    if (gitCheckoutReject) return Promise.reject();
    return Promise.resolve();
  }),
};

const git = jest.fn((path) => {
  return gitObject;
});

git.__setGitIsRepoRet = __setGitIsRepoRet;
git.__setRepoTags = __setRepoTags;
git.__setGitTagsReject = __setGitTagsReject;
git.__setGitCloneReject = __setGitCloneReject;
git.__setGitPullReject = __setGitPullReject;
git.__setGitResetReject = __setGitResetReject;
git.__setGitCleanReject = __setGitCleanReject;
git.__setGitBranchLocalReject = __setGitBranchLocalReject;
git.__setLocalBranches = __setLocalBranches;
git.__setGitCheckoutBranchReject = __setGitCheckoutBranchReject;
git.__setGitCheckoutReject = __setGitCheckoutReject;

module.exports = git;
