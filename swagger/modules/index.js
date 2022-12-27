const tenant = require("./tenant");
const admin = require("./auth");
const restaurant = require("./restaurant");
const customers = require("./customers");
const restaurantBanner = require("./restaurantBanner");

module.exports = {
  schemas: {
    ...tenant.schemas,
    ...admin.schemas,
    ...restaurant.schemas,
    ...customers.schemas,
    ...restaurantBanner.schemas
  },
  paths: {
    ...tenant.apis,
    ...admin.apis,
    ...restaurant.apis,
     ...customers.apis,
     ...restaurantBanner.apis
  },
  requestBodies: {
    ...tenant.body,
    ...admin.body,
    ...restaurant.body,
     ...customers.body,
     ...restaurantBanner.body
  },
};
