const hapi = require('hapi');
const joi = require('joi');

(async () => {
  try {
    var server = new hapi.Server({
      host: 'localhost',
      port: process.argv[2] || 8080
    });
    server.route({
      path: '/login',
      method: 'POST',
      handler: function (request, h) {
        return "login successful";
      },
      config: {
        validate: {
          payload: joi.object({
            isGuest: joi.boolean().required(),
            username: joi.string().when('isGuest', { is: false, then: joi.required()}),
            password: joi.string().alphanum(),
            accessToken: joi.string().alphanum()
          }).options({ allowUnknown: true }).without('password', 'accessToken')
        }
      }
    });
    await server.start();
  } catch (e) {
    console.log(e);
  }
})();
