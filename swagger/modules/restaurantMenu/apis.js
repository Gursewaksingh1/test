const {
    generateEndpoint,
    generatePath,
    createResponse,
    createSingleFileMultipartFormData,
    createPathParameter,
    createIdParam,
    createQueryParameter
  } = require("../../utils/path-utils");
  const { createRestaurantMenuExample } = require("./body");
  const { RestaurantMenuSchema } = require("./schemas");
  
  // const paths = {
  //   ...generateEndpoint({
  //     endpoint: "/admin/restaurantbanner",
  //     methods: {
  //       ...generatePath({
  //         method: "post",
  //         tags: ["restaurantBanner"],
  //         summary: "Create a restaurant banner",
  //         requestBody: {
  //           ...createSingleFileMultipartFormData({
  //             contentRef: RestaurantBannerSchema.properties,
  //             names: ["banner"],
  //             example: createRestaurantBannerExample,
  //           }),
  //         },
  //         responses: {
  //           ...createResponse({
  //             status: "200",
  //             description: "OK",
  //             schemaRef: "#/components/schemas/RestaurantBannerSchema",
  //           }),
  //         },
  //       }),
  //       ...generatePath({
  //         method: "delete",
  //         tags: ["restaurantBanner"],
  //         summary: "delete an restaurant banner either by passing restaurant Id or by banner Id",
  //         parameters: [
  //           createQueryParameter(createIdParam({
  //             name: "restaurantId",
  //             description: "Restaurant Id",
  //             required: false
  //           })),
  //           createQueryParameter(createIdParam({
  //               name: "bannerId",
  //               description: "bannerId Id",
  //               required: false
  //             })),
  //         ],
  //         responses: {
  //           ...createResponse({
  //             status: "200",
  //             description: "OK",
  //             schemaRef: "#/components/schemas/RestaurantBannerSchema",
  //           }),
  //         },
  //       }),    
  //     },
  //   }),
  //   ...generateEndpoint({
  //     endpoint: "/admin/restaurantbanner/{restaurantId}",
  //     methods: {
  //       ...generatePath({
  //         method: "get",
  //         tags: ["restaurantBanner"],
  //         summary: "get a restaurant banner",
  //         parameters: [
  //           createPathParameter(createIdParam({
  //             name: "restaurantId",
  //             description: "Restaurant Id",
  //           })),
  //         ],
  //         responses: {
            
  //           ...createResponse({
  //             status: "200",
  //             description: "OK",
  //             schemaRef: "#/components/schemas/RestaurantBannerSchema",
  //           }),
  //         },
  //       }),
  //     },
  //   }),
  // };
  
  module.exports = paths;