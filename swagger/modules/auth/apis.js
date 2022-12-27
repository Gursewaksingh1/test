const {
  generateEndpoint,
  generatePath,
  createResponse,
  createRequestBody,
} = require("../../utils/path-utils");
const { createAdminExample, loginAdminExample } = require("./body");

const paths = {
  ...generateEndpoint({
    endpoint: "/admin",
    methods: {
      ...generatePath({
        method: "post",
        tags: ["admin"],
        summary: "Create an admin",
        requestBody: createRequestBody({
          description: "Request payload to create an admin",
          required: true,
          contentRef: "#/components/schemas/AdminSchema",
          example: createAdminExample,
        }),
        responses: {
          ...createResponse({
            status: "200",
            description: "OK",
            schemaRef: "#/components/schemas/AdminSchema",
          }),
        },
      }),
    },
  }),
  // login admin
  ...generateEndpoint({
    endpoint: "/admin/login",
    methods: {
      ...generatePath({
        method: "post",
        tags: ["admin"],
        summary: "Login admin",
        requestBody: createRequestBody({
          description: "Request payload to login an admin",
          required: true,
          contentRef: "#/components/schemas/AdminSchema",
          example: loginAdminExample,
        }),
        responses: {
          ...createResponse({
            status: "200",
            description: "OK",
            schemaRef: "#/components/schemas/AdminSchema",
          }),
        },
      }),
    },
  }),
};

module.exports = paths;
