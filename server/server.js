const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');
const debug = require('debug')('server');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const {
  isGitRepoAvailable,
  getRepoTags,
  cloneRepo,
  pullRepo,
} = require('./git/git');
const { compileCode } = require('./compile/compile');
const {
  listenPort,
  tasmotaRepo,
  userPlatformioIni,
  userConfigOvewrite,
} = require('./config/config');

const staticPath = path.join(__dirname, '../build');
let clientWSSocket;
let timerID;

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
  const requiredKeys = ['tasmotaVersion', 'coreVersion', 'boardVersion'];
  if (_.isEmpty(req.body) || !requiredKeys.every((e) => e in req.body)) {
    res.status(400).send({ ok: false, message: 'Wrong JSON data passed.' });
  } else {
    debug(JSON.stringify(req.body, undefined, 2));
    res.send({ ok: true });
    compileCode(clientWSSocket, req.body);
  }
});

app.get('/download/firmware.bin', (req, res) => {
  const firmwareFile = path.resolve(
    tasmotaRepo,
    '.pioenvs/custom/firmware.bin'
  );
  res.download(firmwareFile);
});

app.get('/download/platformio.ini', (req, res) => {
  res.download(userPlatformioIni);
});

app.get('/download/user_config_override.h', (req, res) => {
  res.download(userConfigOvewrite);
});

server.listen(listenPort, () => {
  console.log(`Server started on port ${listenPort}`);
});
