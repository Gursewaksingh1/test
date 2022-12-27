const {
  generateEndpoint,
  generatePath,
  createResponse,
  createRequestBody,
  createPathParameter,
  createIdParam,
} = require("../../utils/path-utils");
const {
  createCustomerExample,
  loginCustomerEample,
  refreshTokenExample,
  forgotPasswordExample,
  newPasswordExample,
  resetPasswordExample,
} = require("./body");
//
const paths = {
  ...generateEndpoint({
    endpoint: "/user/login",
    methods: {
      ...generatePath({
        method: "post",
        tags: ["customer"],
        summary: "Customer login",
        requestBody: createRequestBody({
          description: "Request payload to login a customer",
          required: true,
          contentRef: "#/components/schemas/CustomerSchema",
          example: loginCustomerEample,
        }),
        responses: {
          ...createResponse({
            status: "200",
            description: "OK",
            schemaRef: "#/components/schemas/CustomerSchema",
          }),
        },
      }),
    },
  }),
  ...generateEndpoint({
    endpoint: "/user/signup",
    methods: {
      ...generatePath({
        method: "post",
        tags: ["customer"],
        summary: "Create an customer",
        requestBody: createRequestBody({
          description: "Request payload to create a customer",
          required: true,
          contentRef: "#/components/schemas/CustomerSchema",
          example: createCustomerExample,
        }),
        responses: {
          ...createResponse({
            status: "200",
            description: "OK",
            schemaRef: "#/components/schemas/CustomerSchema",
          }),
        },
      }),
    },
  }),
  ...generateEndpoint({
    endpoint: "/user/refreshtoken",
    methods: {
      ...generatePath({
        method: "put",
        tags: ["customer"],
        summary: "Refresh token when token get expired",
        requestBody: createRequestBody({
          description: "Request payload for refresh token",
          required: true,
          contentRef: "#/components/schemas/CustomerSchema",
          example: refreshTokenExample,
        }),
        responses: {
          ...createResponse({
            status: "200",
            description: "OK",
            schemaRef: "#/components/schemas/CustomerSchema",
          }),
        },
      }),
    },
  }),
  ...generateEndpoint({
    endpoint: "/user/restpassword",
    methods: {
      ...generatePath({
        method: "put",
        tags: ["customer"],
        summary: "Rest password for customer",
        requestBody: createRequestBody({
          description: "Request payload to rest password",
          required: true,
          contentRef: "#/components/schemas/CustomerSchema",
          example: resetPasswordExample,
        }),
        responses: {
          ...createResponse({
            status: "200",
            description: "OK",
            schemaRef: "#/components/schemas/CustomerSchema",
          }),
        },
      }),
    },
  }),
  ...generateEndpoint({
    endpoint: "/user/forgotpassword",
    methods: {
      ...generatePath({
        method: "post",
        tags: ["customer"],
        summary: "Forgot password for customer",
        requestBody: createRequestBody({
          description: "Request payload to forgot password",
          required: true,
          contentRef: "#/components/schemas/CustomerSchema",
          example: forgotPasswordExample,
        }),
        responses: {
          ...createResponse({
            status: "200",
            description: "OK",
            schemaRef: "#/components/schemas/CustomerSchema",
          }),
        },
      }),
    },
  }),
  ...generateEndpoint({
    endpoint: "/user/newpassword",
    methods: {
      ...generatePath({
        method: "post",
        tags: ["customer"],
        summary:
          "Get new password after getting otp from forgot password API  for customer",
        requestBody: createRequestBody({
          description: "Request payload to new password",
          required: true,
          contentRef: "#/components/schemas/CustomerSchema",
          example: newPasswordExample,
        }),
        responses: {
          ...createResponse({
            status: "200",
            description: "OK",
            schemaRef: "#/components/schemas/CustomerSchema",
          }),
        },
      }),
    },
  }),
  ...generateEndpoint({
    endpoint: "/user",
    methods: {
      ...generatePath({
        method: "get",
        tags: ["customer"],
        summary: "get all customer",
        responses: {
          ...createResponse({
            status: "200",
            description: "OK",
            schemaRef: "#/components/schemas/CustomerSchema",
          }),
        },
      }),
    },
  }),
  ...generateEndpoint({
    endpoint: "/user/{customerId}",
    methods: {
      ...generatePath({
        method: "get",
        tags: ["customer"],
        summary: "get an customer",
        parameters: [
          createPathParameter(
            createIdParam({
              name: "customerId",
              description: "customer Id",
            })
          ),
        ],
        responses: {
          ...createResponse({
            status: "200",
            description: "OK",
            schemaRef: "#/components/schemas/CustomerSchema",
          }),
        },
      }),
    },
  }),
};

module.exports = paths;
