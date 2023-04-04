const fsMock = require('fs-extra');
const simpleGitMock = require('simple-git/promise');
const git = require('../git');

const helpersMock = require('../../utils/helpers');
jest.mock('../../utils/helpers');

const { githubRepo, tasmotaRepo, minVersion, edgeBranch, maxVersion } = require('../../config/config');

describe('git.js tests', () => {
  describe('testing isGitRepoAvailable', () => {
    afterEach(() => {
      fsMock.stat.mockClear();
      fsMock.remove.mockClear();
      simpleGitMock().checkIsRepo.mockClear();
      helpersMock.getTcVersion.mockClear();
    });

    it('should return false when repo directory is not present', async (done) => {
      fsMock.__setFsStatReject(true);
      const isAvailable = await git.isGitRepoAvailable();

      expect(isAvailable).toBe(false);
      expect(fsMock.stat).toBeCalledTimes(1);
      expect(fsMock.stat).toBeCalledWith(tasmotaRepo);
      expect(simpleGitMock().checkIsRepo).not.toBeCalled();
      done();
    });

    it('should return true when repo directory is a git repository', async (done) => {
      fsMock.__setFsStatReject(false);
      simpleGitMock.__setGitIsRepoRet(true);
      const isAvailable = await git.isGitRepoAvailable();

      expect(isAvailable).toBe(true);
      expect(fsMock.stat).toBeCalledTimes(1);
      expect(fsMock.stat).toBeCalledWith(tasmotaRepo);
      expect(simpleGitMock().checkIsRepo).toBeCalledTimes(1);
      done();
    });

    it('should return false when repo directory is NOT git repo and directory is succesfully deleted', async (done) => {
      fsMock.__setFsStatReject(false);
      fsMock.__setFsRemoveReject(false);
      simpleGitMock.__setGitIsRepoRet(false);
      const isAvailable = await git.isGitRepoAvailable();

      expect(isAvailable).toBe(false);
      expect(fsMock.stat).toBeCalledTimes(1);
      expect(fsMock.stat).toBeCalledWith(tasmotaRepo);
      expect(fsMock.remove).toBeCalledTimes(1);
      expect(fsMock.remove).toBeCalledWith(tasmotaRepo);
      expect(simpleGitMock().checkIsRepo).toBeCalledTimes(1);
      done();
    });

    it('should throw an error when non git repo directory cannot be removed', async (done) => {
      fsMock.__setFsStatReject(false);
      fsMock.__setFsRemoveReject(true);
      simpleGitMock.__setGitIsRepoRet(false);
      let error;
      try {
        await git.isGitRepoAvailable();
      } catch (e) {
        error = e;
      }

      expect(error.message).toMatch(/Cannot remove directory/i);
      expect(fsMock.stat).toBeCalledTimes(1);
      expect(fsMock.stat).toBeCalledWith(tasmotaRepo);
      expect(fsMock.remove).toBeCalledTimes(1);
      expect(fsMock.remove).toBeCalledWith(tasmotaRepo);
      expect(simpleGitMock().checkIsRepo).toBeCalledTimes(1);
      done();
    });
  });

  describe('testing getRepoTags', () => {
    afterEach(() => {
      fsMock.stat.mockClear();
      fsMock.remove.mockClear();
      simpleGitMock().checkIsRepo.mockClear();
      simpleGitMock().tags.mockClear();
      helpersMock.getTcVersion.mockClear();
    });
    it('should return only development tag when TC version is development', async (done) => {
      fsMock.__setFsStatReject(false);
      simpleGitMock.__setGitIsRepoRet(true);
      simpleGitMock.__setGitTagsReject(false);
      helpersMock.__setReturnVersion('100-dev');
      const tags = await git.getRepoTags();

      expect(tags).toHaveLength(1);
      expect(tags).toEqual(expect.arrayContaining(['development']));
      expect(simpleGitMock().tags).toBeCalledTimes(0);
      expect(helpersMock.getTcVersion).toBeCalledTimes(1);
      done();
    });

    it('should return filtered repository tags when TC version is NOT development', async (done) => {
      simpleGitMock.__setRepoTags([minVersion]);
      fsMock.__setFsStatReject(false);
      simpleGitMock.__setGitIsRepoRet(true);
      simpleGitMock.__setGitTagsReject(false);
      helpersMock.__setReturnVersion('100');
      const tags = await git.getRepoTags();

      expect(tags).toHaveLength(1);
      expect(tags).toEqual(expect.arrayContaining([minVersion]));
      expect(simpleGitMock().tags).toBeCalledTimes(1);
      done();
    });

    it('should throw an error when tags cannot be retrieved because directory is not git repo', async (done) => {
      fsMock.__setFsStatReject(true);
      let error;
      try {
        await git.getRepoTags();
      } catch (e) {
        error = e;
      }

      expect(error.message).toMatch(/unable to get/i);
      done();
    });

    it('should throw an error when git.tags function fails', async (done) => {
      fsMock.__setFsStatReject(false);
      simpleGitMock.__setGitIsRepoRet(true);
      simpleGitMock.__setGitTagsReject(true);
      helpersMock.__setReturnVersion('100');
      let error;
      try {
        await git.getRepoTags();
      } catch (e) {
        error = e;
      }

      expect(error.message).toMatch(/unable to get/i);
      done();
    });
  });

  describe('testing switchToBranch', () => {
    beforeAll(() => {
      simpleGitMock.__setRepoTags([minVersion]);
      fsMock.__setFsStatReject(false);
      simpleGitMock.__setGitTagsReject(false);
    });

    beforeEach(() => {
      simpleGitMock().reset.mockClear();
      simpleGitMock().clean.mockClear();
      simpleGitMock().checkoutBranch.mockClear();
      simpleGitMock().checkout.mockClear();
      helpersMock.getTcVersion.mockClear();
    });

    it('should throw an error on reset branch fail', async (done) => {
      let error;
      simpleGitMock.__setGitResetReject(true);
      try {
        await git.switchToBranch(edgeBranch);
      } catch (e) {
        error = e;
      }

      expect(error.message).toMatch(/unable to reset/i);
      expect(simpleGitMock().reset).toBeCalledTimes(1);
      expect(simpleGitMock().reset).toBeCalledWith('hard');
      done();
    });

    it('should throw an error on clean fail', async (done) => {
      simpleGitMock.__setGitResetReject(false);
      simpleGitMock.__setGitCleanReject(true);
      let error;

      try {
        await git.switchToBranch(edgeBranch);
      } catch (e) {
        error = e;
      }

      expect(error.message).toMatch(/unable to clean/i);
      expect(simpleGitMock().clean).toBeCalledTimes(1);
      done();
    });

    it('should throw an error on branchLocal fail', async (done) => {
      simpleGitMock.__setGitResetReject(false);
      simpleGitMock.__setGitCleanReject(false);
      let error;

      try {
        await git.switchToBranch(edgeBranch);
      } catch (e) {
        error = e;
      }
      expect(error.message).toMatch(/cannot get the list of local branches/i);
      done();
    });

    it('should throw an error on checkout to remote branch fail', async (done) => {
      simpleGitMock.__setGitResetReject(false);
      simpleGitMock.__setGitCleanReject(false);
      simpleGitMock.__setGitBranchLocalReject(false);
      helpersMock.__setReturnVersion('100-dev');
      let error;

      try {
        await git.switchToBranch(edgeBranch);
      } catch (e) {
        error = e;
      }

      expect(error.message).toMatch(/switching to branch/i);
      expect(simpleGitMock().checkoutBranch).toBeCalledTimes(1);
      done();
    });

    it('should checkout to remote development branch and return branch name', async (done) => {
      simpleGitMock.__setGitResetReject(false);
      simpleGitMock.__setGitCleanReject(false);
      simpleGitMock.__setGitBranchLocalReject(false);
      simpleGitMock.__setGitCheckoutBranchReject(false);
      helpersMock.__setReturnVersion('100-dev');
      const branch = await git.switchToBranch(edgeBranch);

      expect(branch).toBe(edgeBranch);
      expect(simpleGitMock().checkoutBranch).toBeCalledTimes(1);
      expect(simpleGitMock().checkoutBranch).toBeCalledWith(edgeBranch, edgeBranch);

      done();
    });

    it('should checkout to remote minVersion branch and return branch name', async (done) => {
      simpleGitMock.__setGitResetReject(false);
      simpleGitMock.__setGitCleanReject(false);
      simpleGitMock.__setGitBranchLocalReject(false);
      simpleGitMock.__setGitCheckoutBranchReject(false);
      helpersMock.__setReturnVersion('100');
      const branch = await git.switchToBranch(minVersion);

      expect(branch).toBe(minVersion);
      expect(simpleGitMock().checkoutBranch).toBeCalledTimes(1);
      expect(simpleGitMock().checkoutBranch).toBeCalledWith(minVersion, minVersion);

      done();
    });

    it('should throw an error on checkout to local branch fail', async (done) => {
      simpleGitMock.__setLocalBranches({ development: edgeBranch });
      simpleGitMock.__setGitResetReject(false);
      simpleGitMock.__setGitCleanReject(false);
      simpleGitMock.__setGitBranchLocalReject(false);

      let error;

      try {
        await git.switchToBranch(edgeBranch);
      } catch (e) {
        error = e;
      }

      expect(simpleGitMock().checkout).toBeCalledTimes(1);
      expect(error.message).toMatch(/switching to branch/i);
      done();
    });

    it('should checkout to local branch and return branch name', async (done) => {
      simpleGitMock.__setLocalBranches({ development: edgeBranch });
      simpleGitMock.__setGitResetReject(false);
      simpleGitMock.__setGitCleanReject(false);
      simpleGitMock.__setGitBranchLocalReject(false);
      simpleGitMock.__setGitCheckoutReject(false);

      const branch = await git.switchToBranch(edgeBranch);

      expect(branch).toBe(edgeBranch);
      expect(simpleGitMock().checkout).toBeCalledTimes(1);
      done();
    });
  });

  describe('testing cloneRepo', () => {
    afterEach(() => {
      simpleGitMock().clone.mockClear();
      helpersMock.getTcVersion.mockClear();
    });

    it('should return development tag if Tasmota repo is already there', async (done) => {
      fsMock.__setFsStatReject(false);
      simpleGitMock.__setGitTagsReject(false);
      simpleGitMock.__setRepoTags([edgeBranch]);
      helpersMock.__setReturnVersion('100-dev');
      const tags = await git.cloneRepo();

      expect(tags).toHaveLength(1);
      expect(tags).toEqual(expect.arrayContaining([edgeBranch]));
      done();
    });

    it('should return minVersion tag if Tasmota repo is already there', async (done) => {
      fsMock.__setFsStatReject(false);
      simpleGitMock.__setGitTagsReject(false);
      simpleGitMock.__setRepoTags([minVersion]);
      helpersMock.__setReturnVersion('100');
      const tags = await git.cloneRepo();

      expect(tags).toHaveLength(1);
      expect(tags).toEqual(expect.arrayContaining([minVersion]));
      done();
    });

    it('should throw an error on clone fail', async (done) => {
      fsMock.__setFsStatReject(true);
      simpleGitMock.__setGitCloneReject(true);
      let error;
      try {
        await git.cloneRepo();
      } catch (e) {
        error = e;
      }

      expect(error.message).toMatch(/unable to clone/i);
      expect(simpleGitMock().clone).toHaveBeenCalledTimes(1);
      expect(simpleGitMock().clone).toHaveBeenCalledWith(githubRepo, tasmotaRepo);
      done();
    });

    it('should clone Tasmota repo and return tags when repo is not available locally', async (done) => {
      // first for isRepoAvailable at the start of cloneRepo
      // second for getRepoTags called at the end of cloneRepo
      fsMock.stat.mockReturnValueOnce(Promise.reject()).mockReturnValueOnce(Promise.resolve());
      simpleGitMock.__setGitCloneReject(false);
      helpersMock.__setReturnVersion('100');
      simpleGitMock.__setRepoTags([minVersion, maxVersion]);

      const tags = await git.cloneRepo();
      expect(tags).toHaveLength(2);
      expect(tags).toEqual(expect.arrayContaining([minVersion, maxVersion]));
      expect(simpleGitMock().clone).toHaveBeenCalledTimes(1);
      expect(simpleGitMock().clone).toHaveBeenCalledWith(githubRepo, tasmotaRepo);
      done();
    });
  });
  describe('testing pullRepo', () => {
    beforeEach(() => {
      simpleGitMock().pull.mockClear();
      helpersMock.getTcVersion.mockClear();
    });

    it('should clone the repo if there is no repo available', async (done) => {
      fsMock.__setFsStatReject(false);
      // first for isRepoAvailable at the start of pullRepo
      fsMock.stat.mockReturnValueOnce(Promise.reject());
      simpleGitMock.__setGitTagsReject(false);
      simpleGitMock.__setRepoTags([minVersion, maxVersion]);
      helpersMock.__setReturnVersion('100');
      const tags = await git.pullRepo();

      expect(tags).toHaveLength(2);
      expect(tags).toEqual(expect.arrayContaining([minVersion, maxVersion]));
      expect(simpleGitMock().pull).toBeCalledTimes(0);
      done();
    });

    it('should throw an error on pull fail', async (done) => {
      fsMock.__setFsStatReject(false);
      let error;
      try {
        await git.pullRepo();
      } catch (e) {
        error = e;
      }

      expect(error.message).toMatch(/unable to pull/i);
      expect(simpleGitMock().pull).toBeCalledTimes(1);
      done();
    });

    it('should pull latest changes and return repo tags', async (done) => {
      fsMock.__setFsStatReject(false);
      simpleGitMock.__setGitPullReject(false);
      simpleGitMock.__setGitTagsReject(false);
      simpleGitMock.__setRepoTags([minVersion, maxVersion]);
      const tags = await git.pullRepo();

      expect(tags).toHaveLength(2);
      expect(tags).toEqual(expect.arrayContaining([minVersion, maxVersion]));
      expect(simpleGitMock().pull).toBeCalledTimes(1);
      done();
    });
  });
});
