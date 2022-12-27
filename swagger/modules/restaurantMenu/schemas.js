const RestaurantMenuSchema = {
    title: "",
    type: "object",
    properties: {
      name: {
        title: "name",
        type: "string",
      },
      image: {
        title: "image",
        type: "string",
      },
      restaurantId: {
        title: "restaurantId",
        type: "string",
      },
      categoryIds: {
        title: "categoryIds",
        type: "array",
      },
    },
  };
  
  module.exports = {
    RestaurantMenuSchema,
  };
  