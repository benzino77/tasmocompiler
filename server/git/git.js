const git = require('simple-git');
const fs = require('fs-extra');
const _ = require('lodash');
const debug = require('debug')('git');
const semver = require('semver');
const helpers = require('../utils/helpers');

const { tasmotaRepo, githubRepo, minVersion, maxVersion, edgeBranch } = require('../config/config');

const isGitRepoAvailable = async () => {
  try {
    await fs.stat(tasmotaRepo);
  } catch (e) {
    return false; // directory does not exists
  }

  const isRepo = await git(tasmotaRepo).checkIsRepo();
  if (!isRepo) {
    // directory is not git repo, lets try to delete it
    debug(`${tasmotaRepo} is not git repo. Trying to delete it...`);
    try {
      await fs.remove(tasmotaRepo);
      debug('Directory deleted');
    } catch (e) {
      const message = `Cannot remove directory: ${tasmotaRepo}`;
      debug(message);
      throw new Error(message);
    }
  }

  return isRepo;
};

const getRepoTags = async () => {
  const isRepo = await isGitRepoAvailable();
  const message = 'Unable to get TAGS';
  const tcVersion = helpers.getTcVersion().toLowerCase();

  if (isRepo) {
    try {
      if (tcVersion.includes('dev')) {
        return [edgeBranch];
      }
      const allTags = await git(tasmotaRepo).tags();
      let tags = allTags.all.filter((t) => t.startsWith('v'));
      tags = tags.filter((t) => semver.valid(t) && semver.gte(t, minVersion) && semver.lte(t, maxVersion));
      return [...tags];
    } catch (e) {
      debug(e.message);
      debug(message);
      throw new Error(message);
    }
  }

  debug(message);
  throw new Error(message);
};

const switchToBranch = async (branch) => {
  const tags = await getRepoTags();
  let notLocalBranches;

  try {
    await git(tasmotaRepo).reset('hard');
  } catch (e) {
    const message = 'Unable to RESET repository';
    debug(message);
    throw new Error(message);
  }

  try {
    await git(tasmotaRepo).clean('dfx');
  } catch (e) {
    const message = 'Unable to CLEAN repository';
    debug(message);
    throw new Error(message);
  }

  try {
    const summary = await git(tasmotaRepo).branchLocal();
    const localBranches = Object.keys(summary.branches);
    notLocalBranches = _.difference(tags, localBranches);
  } catch (e) {
    const message = 'Cannot get the list of local BRANCHES';
    debug(message);
    throw new Error(message);
  }

  if (_.indexOf(notLocalBranches, branch) > -1) {
    try {
      await git(tasmotaRepo).checkoutBranch(branch, branch);
      return branch;
    } catch (e) {
      throw new Error(`Switching to branch ${branch} failed`);
    }
  }

  try {
    await git(tasmotaRepo).checkout(branch);
    return branch;
  } catch (e) {
    throw new Error(`Switching to branch ${branch} failed`);
  }
};

const cloneRepo = async () => {
  const isRepo = await isGitRepoAvailable();
  if (!isRepo) {
    try {
      await git().clone(githubRepo, tasmotaRepo);
      debug('Repo cloned.');
    } catch (e) {
      const message = 'Unable to CLONE git repository';
      debug(message);
      throw new Error(message);
    }
  }

  const tags = await getRepoTags();
  return tags;
};

const pullRepo = async (refresh) => {
  const isRepo = await isGitRepoAvailable();
  if (isRepo) {
    await switchToBranch(edgeBranch);

    try {
      await git(tasmotaRepo).pull();
      debug('Branch %s is now up to date.', edgeBranch);
    } catch (e) {
      const message = 'Unable to PULL latest changes';
      debug(message);
      throw new Error(message);
    }

    const tags = await getRepoTags();
    return tags;
  }

  debug('There is no repository available. Trying to clone.');
  const tags = await cloneRepo();
  return tags;
};

module.exports = {
  isGitRepoAvailable,
  getRepoTags,
  switchToBranch,
  cloneRepo,
  pullRepo,
};
