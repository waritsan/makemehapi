const hapi = require('hapi');
const joi = require('joi');

(async () => {
  try {
    var server = new hapi.Server({
      host: 'localhost',
      port: process.argv[2] || 8080
    });
    server.route({
      path: '/chickens/{breed?}',
      method: 'GET',
      handler: function (request, h) {
        return `You asked fot the chicken ${request.params.breed}`;
      },
      config: {
        validate: {
          params: {
            breed: joi.string().required()
          }
        }
      }
    });
    await server.start();
  } catch (e) {
    console.log(e);
  }
})();
