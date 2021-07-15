const { server } = require('./server');
const { listenPort } = require('./config/config');

server.listen(listenPort, () => {
  console.log(`Server started on port ${listenPort}`);
});
