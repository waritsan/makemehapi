const Hapi = require('hapi');
const H2o2 = require('h2o2');

(async () => {
  try {
    const port = process.argv[2] || 8080
    const server = new Hapi.Server({
      host: 'localhost',
      port: port
    });
    await server.register(H2o2);
    server.route({
      path: '/proxy',
      method: 'GET',
      handler: {
        proxy: {
          host: 'localhost',
          port: 65535
        }
      }
    });
    await server.start();
    console.log('Server running at: ', server.info.uri);
  } catch (e) {
      console.log(e);
  }
})();
