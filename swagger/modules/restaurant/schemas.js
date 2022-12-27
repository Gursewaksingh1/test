const RestaurantSchema = {
  title: "",
  type: "object",
  properties: {
    name: {
      title: "name",
      type: "string",
    },
    address: {
      title: "address",
      type: "string",
    },
    displayAddress: {
      title: "displayAddress",
      type: "string",
    },
    status: {
      title: "status",
      enum: ["ACTIVE", "INACTIVE", "OPEN", "CLOSE"],
      enum_titles: ["ACTIVE", "INACTIVE", "OPEN", "CLOSE"],
      type: "string",
    },
    logo: {
      title: "logo",
      type: "string",
    },
    coverPhoto: {
      title: "coverPhoto",
      type: "string",
    },
    restaurantBannersId: {
      title: "restaurantBannersId",
      type: "string",
    },
    restaurantBannersId: {
      title: "ratingId",
      type: "string",
    },
    slug: {
      title: "slug",
      type: "string",
    },
    backgroundColor: {
      title: "backgroundColor",
      type: "string",
    },
    openingTime: {
      title: "openingTime",
      type: "string",
    },
    closingTime: {
      title: "closingTime",
      type: "string",
    },
  },
};

module.exports = {
  RestaurantSchema,
};
