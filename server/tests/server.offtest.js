const request = require('supertest');
const fsMock = require('fs-extra');
const { server } = require('../server');
const io = require('socket.io-client');

const workdir = process.env.WORKDIR;

const listenPort = 5000;
const timeOut = 10 * 60 * 1000;

describe('server.js integration testing', () => {
  it('dummy test', () => {
    expect(true).toBe(true);
  });
});

// describe('When WORKDIR is not present', () => {
//   beforeEach(() => {
//     server.listen(listenPort);
//     server.timeout = timeOut;
//   });

//   afterEach((done) => {
//     server.close(done);
//   });

//   it(
//     'should return repo is NOT available',
//     async (done) => {
//       const { tasmotaRepo } = require('../config/config');
//       fsMock.__setFsStatReject(true);
//       const res = await request(server).get('/api/v1/repoavailability');
//       expect(fsMock.stat).toBeCalled();
//       expect(fsMock.stat).toBeCalledWith(tasmotaRepo);
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toHaveProperty('ok');
//       expect(res.body).toHaveProperty('result');
//       expect(res.body.ok).toBe(true);
//       expect(res.body.result).toBe(false);
//       done();
//     },
//     timeOut
//   );
// });

// describe('When Tasmota is not a repo directory', () => {
//   const { tasmotaRepo } = require('../config/config');

//   // beforeAll(() => {
//   //   fs.emptyDirSync(workdir);
//   //   fs.mkdirSync(tasmotaRepo);
//   // });

//   beforeEach(() => {
//     server.listen(listenPort);
//     server.timeout = timeOut;
//   });

//   afterEach((done) => {
//     server.close(done);
//   });

//   it(
//     'should return this is not a repo and delete Tasmota directory',
//     async (done) => {
//       fsMock.__setFsStatReject(false);
//       const res = await request(server).get('/api/v1/repoavailability');
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toHaveProperty('ok');
//       expect(res.body).toHaveProperty('result');
//       expect(res.body.ok).toBe(true);
//       expect(res.body.result).toBe(false);
//       done();
//     },
//     timeOut
//   );

// it(
//   'should FAIL on call to /api/v1/repotags',
//   async (done) => {
//     const res = await request(server).get('/api/v1/repotags');
//     expect(res.statusCode).toEqual(500);
//     expect(res.body).toHaveProperty('ok');
//     expect(res.body).toHaveProperty('tags');
//     expect(res.body).toHaveProperty('message');
//     expect(res.body.ok).toBe(false);
//     expect(Array.isArray(res.body.tags)).toBe(true);
//     expect(res.body.tags.length).toBe(0);
//     done();
//   },
//   timeOut
// );
// });

// describe('Test API endpoints', () => {
//   const {
//     minVersion,
//     edgeBranch,
//     userConfigOvewrite,
//     userPlatformioOverrideIni,
//   } = require('../config/config');
//   const pkg = require('../../package.json');

//   let clientSocket;

//   const testSet = require('./testSet.json');
//   testSet.version.tasmotaVersion = minVersion;

//   beforeEach((done) => {
//     server.listen(listenPort, () => {
//       clientSocket = io(`http://localhost:${listenPort}`);
//       clientSocket.on('connect', done);
//     });
//     server.timeout = timeOut;
//   });

//   afterEach((done) => {
//     clientSocket.close();
//     server.close(done);
//   });

//   it(
//     'should clone Tasmota repo and return tags on call to /api/v1/clonerepo',
//     async (done) => {
//       const res = await request(server).get('/api/v1/clonerepo');
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toHaveProperty('ok');
//       expect(res.body).toHaveProperty('tags');
//       expect(Array.isArray(res.body.tags)).toBe(true);
//       expect(res.body.tags.includes(minVersion)).toBe(true);
//       expect(res.body.tags.includes(edgeBranch)).toBe(true);
//       done();
//     },
//     timeOut
//   );

//   it(
//     'should return TasmoCompiler version on call to /api/v1/tcversion',
//     async (done) => {
//       const res = await await request(server).get('/api/v1/tcversion');
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toHaveProperty('ok');
//       expect(res.body).toHaveProperty('version');
//       expect(res.body.ok).toBe(true);
//       expect(res.body.version).toBe(pkg.version);
//       done();
//     },
//     timeOut
//   );

//   it(
//     'should return repo is available on call to /api/v1/repoavailability',
//     async (done) => {
//       const res = await await request(server).get('/api/v1/repoavailability');
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toHaveProperty('ok');
//       expect(res.body).toHaveProperty('result');
//       expect(res.body.ok).toBe(true);
//       expect(res.body.result).toBe(true);
//       done();
//     },
//     timeOut
//   );

//   it(
//     'should return Tasmota repo tags on call to /api/v1/repotags',
//     async (done) => {
//       const res = await request(server).get('/api/v1/repotags');
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toHaveProperty('ok');
//       expect(res.body).toHaveProperty('tags');
//       expect(res.body.ok).toBe(true);
//       expect(Array.isArray(res.body.tags)).toBe(true);
//       expect(res.body.tags.includes(minVersion)).toBe(true);
//       expect(res.body.tags.includes(edgeBranch)).toBe(true);
//       done();
//     },
//     timeOut
//   );

//   it(
//     'should refresh Tasmota repo and return tags on call to /api/v1/pullrepo',
//     async (done) => {
//       const res = await request(server).get('/api/v1/pullrepo');
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toHaveProperty('ok');
//       expect(res.body).toHaveProperty('tags');
//       expect(res.body.ok).toBe(true);
//       expect(Array.isArray(res.body.tags)).toBe(true);
//       expect(res.body.tags.includes(minVersion)).toBe(true);
//       expect(res.body.tags.includes(edgeBranch)).toBe(true);
//       done();
//     },
//     timeOut
//   );

//   it(
//     'should reject not JSON data passed to compilation',
//     async (done) => {
//       const res = await request(server).post('/api/v1/compile').send('');
//       expect(res.statusCode).toEqual(400);
//       expect(res.body).toHaveProperty('ok');
//       expect(res.body).toHaveProperty('message');
//       expect(res.body.ok).toBe(false);
//       done();
//     },
//     timeOut
//   );

//   it(
//     'should reject invalid JSON data passed to compilation',
//     async (done) => {
//       const res = await request(server)
//         .post('/api/v1/compile')
//         .send({ test: 'test' });
//       expect(res.statusCode).toEqual(400);
//       expect(res.body).toHaveProperty('ok');
//       expect(res.body).toHaveProperty('message');
//       expect(res.body.ok).toBe(false);
//       done();
//     },
//     timeOut
//   );

//   it(
//     'should send WebSocket messages on connect to the client',
//     (done) => {
//       clientSocket.on('message', (data) => {
//         expect(data).toMatch(/welcome stranger/i);
//         done();
//       });
//     },
//     timeOut
//   );

//   it(
//     'should accept JSON data passed to compilation, compile the code and send WbSocket message when finished',
//     async (done) => {
//       clientSocket.on('finished', (data) => {
//         expect(data).toHaveProperty('ok');
//         expect(data.ok).toBe(true);
//         done();
//       });
//       const res = await request(server).post('/api/v1/compile').send(testSet);
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toHaveProperty('ok');
//       expect(res.body.ok).toBe(true);
//     },
//     timeOut
//   );

//   it(
//     'should have user_config_override.h and platformio_override.ini files created',
//     () => {
//       const ucoh = fs.statSync(userConfigOvewrite);
//       const poi = fs.statSync(userPlatformioOverrideIni);
//       expect(ucoh.isFile()).toBe(true);
//       expect(poi.isFile()).toBe(true);
//     },
//     timeOut
//   );

// it(
//   'should send WebSocket messages on finish compilation to the client',
//   async (done) => {
//     clientSocket.on('finished', (data) => {
//       expect(data).toHaveProperty('ok');
//       expect(data.ok).toBe(true);
//       done();
//     });
//     // needed delay to let git finish it's job from previous tests
//     await new Promise((f) => setTimeout(f, 500));

//     const res = await request(server).post('/api/v1/compile').send(testSet);
//   },
//   timeOut
// );
// });
