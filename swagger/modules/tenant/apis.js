const {
  generateEndpoint,
  generatePath,
  createResponse,
  createRequestBody,
} = require("../../utils/path-utils");
const { createTenantExample } = require("./body");

const paths = {
  ...generateEndpoint({
    endpoint: "/tenant",
    methods: {
      ...generatePath({
        method: "post",
        tags: ["tenant"],
        summary: "Create a tenant",
        requestBody: createRequestBody({
          description: "Request payload to create tenant",
          required: true,
          contentRef: "#/components/schemas/TenantSchema",
          example: createTenantExample,
        }),
        responses: {
          ...createResponse({
            status: "200",
            description: "OK",
            schemaRef: "#/components/schemas/TenantSchema",
          }),
        },
      }),
    },
  }),
};

module.exports = paths;
