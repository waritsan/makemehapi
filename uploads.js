const Hapi = require('hapi');

(async () => {
  try {
    var server = new Hapi.Server({
      host: 'localhost',
      port: process.argv[2] || 8080
    });
    server.route({
      method: 'POST',
      path: '/upload',
      config: {
        handler: function (request, reply) {
          return new Promise(function(resolve, reject) {
            let body = '';
            request.payload.file.on('data', function (data) {
              body += data;
            });
            request.payload.file.on('end', function () {
              let result = {
                description: request.payload.description,
                file: {
                  data: body,
                  filename: request.payload.file.hapi.filename,
                  headers: request.payload.file.hapi.headers
                }
              }
              return resolve(JSON.stringify(result));
            });
            request.payload.file.on('error', function (err) {
              return reject(err);
            });
          });
        },
        payload: {
          output: 'stream',
          parse: true,
          allow: 'multipart/form-data'
        }
      }
    });
    await server.start();
  } catch (e) {
    console.log(e);
  }
})();
