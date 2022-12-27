const AdminSchema = {
  title: "",
  type: "object",
  properties: {
    name: {
      title: "name",
      type: "string",
    },
    email: {
      title: "email",
      type: "string",
    },
    phone: {
      title: "phone",
      type: "string",
    },
    password: {
      title: "password",
      type: "string",
    },
    role: {
      title: "role",
      enum: ["admin", "manager"],
      enum_titles: ["admin", "manager", "storefront"],
      type: "string",
    },
    restaurantId: {
      title: "restaurantId",
      type: "string",
    },
  },
};

module.exports = {
  AdminSchema,
};
