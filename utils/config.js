let envData = {
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  SECRET_CUSTOMER: process.env.SECRET_CUSTOMER,
  REFRESH_TOKEN_SECRET_CUSTMOER: process.env.REFRESH_TOKEN_SECRET_CUSTMOER,
  MONGODB_URI_TENANT: process.env.MONGODB_URI_TENANT,
  MONGODB_URI_ADMIN: process.env.MONGODB_URI_ADMIN,
  DEFAULT_TENANT: process.env.DEFAULT_TENANT,
};
module.exports = envData;
