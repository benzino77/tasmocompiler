const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');
const debug = require('debug')('server');
const pkg = require('../package.json');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { isGitRepoAvailable, getRepoTags, cloneRepo, pullRepo } = require('./git/git');
const { compileCode } = require('./compile/compile');
const { tasmotaRepo, userPlatformioOverrideIni, userConfigOvewrite, tasmotaMinimalBinary, tasmotaELF } = require('./config/config');

const staticPath = path.join(__dirname, '../build');
let clientWSSocket;

io.on('connection', (socket) => {
  clientWSSocket = socket;
  socket.emit('message', 'Welcome stranger!\n');
});

app.use(bodyParser.json());
// handle bodyParser error
app.use((err, req, res, next) => {
  if (err) {
    res.status(400).send({ ok: false, message: 'Wrong JSON data passed.' });
  }
  next();
});
app.use(express.static(staticPath));

app.get('/api/v1/tcversion', (req, res) => {
  res.send({ ok: true, version: pkg.version });
});

app.get('/api/v1/repoavailability', (req, res) => {
  isGitRepoAvailable()
    .then((result) => {
      // res.set('Access-Control-Allow-Origin', '*').send({ result });
      res.send({ ok: true, result });
    })
    .catch((e) => {
      res.status(500).send({ ok: false, result: false, message: e.message });
    });
});

app.get('/api/v1/repotags', (req, res) => {
  getRepoTags()
    .then((tags) => {
      res.send({ ok: true, tags });
    })
    .catch((e) => {
      res.status(500).send({ ok: false, tags: [], message: e.message });
    });
});

app.get('/api/v1/clonerepo', (req, res) => {
  cloneRepo()
    .then((tags) => {
      res.send({ ok: true, tags });
    })
    .catch((e) => {
      res.status(500).send({ ok: false, tags: [], message: e.message });
    });
});

app.get('/api/v1/pullrepo', (req, res) => {
  pullRepo()
    .then((tags) => {
      res.send({ ok: true, tags });
    })
    .catch((e) => {
      res.status(500).send({ ok: false, tags: [], message: e.message });
    });
});

app.post('/api/v1/compile', (req, res) => {
  const requiredKeys = ['version', 'features', 'network'];
  if (_.isEmpty(req.body) || !requiredKeys.every((e) => e in req.body)) {
    res.status(400).send({ ok: false, message: 'Wrong JSON data passed.' });
  } else {
    debug(JSON.stringify(req.body, undefined, 2));
    res.send({ ok: true });
    compileCode(clientWSSocket, req.body);
  }
});

app.get('/download/:fileName', (req, res) => {
  if (req.params.fileName === 'platformio_override.ini') {
    res.download(userPlatformioOverrideIni);
    return;
  }

  if (req.params.fileName === 'user_config_override.h') {
    res.download(userConfigOvewrite);
    return;
  }

  if (req.params.fileName.includes('.elf') {
    arr = req.parms.fileName.split(".");
    res.download(path.resolve(tasmotaELF, "${arr[0]}/firmware.elf);
    return;
  }

  if (req.params.fileName === tasmotaMinimalBinary.split('/').pop()) {
    res.download(tasmotaMinimalBinary);
    return;
  }

  const firmwareFile = path.resolve(tasmotaRepo, `build_output/firmware/${req.params.fileName}`);
  res.download(firmwareFile);
});

module.exports = { server };
