const { schemas, requestBodies } = require("../modules");

module.exports = {
  components: {
    schemas,
    requestBodies,
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      subdomain: {
        name: "subdomain",
        type: "apiKey",
        in: "header",
      },
    },
  },
};
