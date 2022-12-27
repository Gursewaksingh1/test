const RestaurantBannerSchema = {
    title: "",
    type: "object",
    properties: {
      name: {
        title: "name",
        type: "string",
      },
      desc: {
        title: "desc",
        type: "string",
      },
      backgroundColor: {
        title: "backgroundColor",
        type: "string",
      },
      restaurantName: {
        title: "restaurantName",
        type: "string",
      },
      restaurantId: {
        title: "restaurantId",
        type: "string",
      },
      banner: {
        title: "banner",
        type: "string",
      },
    },
  };
  
  module.exports = {
    RestaurantBannerSchema,
  };
  