const Hapi = require('hapi');
const Rot13 = require('rot13-transform');
const Fs = require('fs');
const Path = require('path');

(async () => {
  try {
    var server = new Hapi.Server({
      host: 'localhost',
      port: process.argv[2] || 8080
    });
    server.route({
      path: '/',
      method: 'GET',
      config: {
        handler: function (request, h) {
          var thisFile = Fs.createReadStream(Path.join(__dirname, 'input.txt'));
          return thisFile.pipe(Rot13());
        }
      }
    });
    await server.start();
  } catch (e) {
    console.log(e);
  }
})();
