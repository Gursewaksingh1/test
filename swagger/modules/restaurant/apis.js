const {
  generateEndpoint,
  generatePath,
  createResponse,
  createSingleFileMultipartFormData,
  createPathParameter,
  createIdParam,
} = require("../../utils/path-utils");
const { createRestaurantExample,updateRestaurantExample } = require("./body");
const { RestaurantSchema } = require("./schemas");

const paths = {
  ...generateEndpoint({
    endpoint: "/admin/restaurant",
    methods: {
      ...generatePath({
        method: "post",
        tags: ["restaurant"],
        summary: "Create an restaurant",
        requestBody: {
          ...createSingleFileMultipartFormData({
            contentRef: RestaurantSchema.properties,
            names: ["logo", "coverPhoto"],
            example: createRestaurantExample,
          }),
        },
        responses: {
          ...createResponse({
            status: "200",
            description: "OK",
            schemaRef: "#/components/schemas/RestaurantSchema",
          }),
        },
      }),
      ...generatePath({
        method: "put",
        tags: ["restaurant"],
        summary: "update an restaurant",
        requestBody: {
          ...createSingleFileMultipartFormData({
            contentRef: RestaurantSchema.properties,
            names: ["logo", "coverPhoto"],
            example: createRestaurantExample,
          }),
        },
        responses: {
          ...createResponse({
            status: "200",
            description: "OK",
            schemaRef: "#/components/schemas/RestaurantSchema",
          }),
        },
      }),
      ...generatePath({
        method: "get",
        tags: ["restaurant"],
        summary: "get all restaurants",
        responses: {
          ...createResponse({
            status: "200",
            description: "OK",
            schemaRef: "#/components/schemas/RestaurantSchema",
          }),
        },
      }),
      
    },
  }),
  ...generateEndpoint({
    endpoint: "/admin/restaurant/{restaurantId}",
    methods: {
      ...generatePath({
        method: "get",
        tags: ["restaurant"],
        summary: "get an restaurant",
        parameters: [
          createPathParameter(createIdParam({
            name: "restaurantId",
            description: "Restaurant Id",
          })),
        ],
        responses: {
          
          ...createResponse({
            status: "200",
            description: "OK",
            schemaRef: "#/components/schemas/RestaurantSchema",
          }),
        },
      }),
    },
  }),
};

module.exports = paths;