const TenantSchema = {
  title: "",
  type: "object",
  properties: {
    name: {
      title: "name",
      type: "string",
    },
    uuid: {
      title: "uuid",
      type: "string",
    },
    email: {
      title: "email",
      type: "string",
    },
    password: {
      title: "password",
      type: "string",
    },
    domainName: {
      title: "domainName",
      type: "string",
    },
    plan: {
      title: "plan",
      type: "object",
      properties: {
        amount: {
          title: "amount",
          type: "integer",
        },
        planName: {
          title: "planName",
          type: "string",
        },
        StartDate: {
          title: "planName",
          type: "string",
        },
        type: {
          enum: ["Single merchant", "multi merchant", "storefront"],
          enum_titles: ["Single merchant", "multi merchant", "storefront"],
          type: "string",
          title: "type",
        },
      },
    },
  },
};

module.exports = {
  TenantSchema,
};
