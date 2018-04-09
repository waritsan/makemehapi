const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

(async () => {
  try {
    const server = new Hapi.Server({
      host: 'localhost',
      port: Number(process.argv[2] || 8080)
    });
    await server.register(Inert);
    server.route({
      path: '/foo/bar/baz/{param}',
      method: 'GET',
      handler: {
        directory: {
          path: Path.join(__dirname, 'public')
        }
      }
    });
    await server.start();
    console.log('Server running at: ', server.info.uri);
  } catch (e) {
    console.log(e);
  }
})();
