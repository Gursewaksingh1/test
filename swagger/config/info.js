const { version } = require("../../package.json");

module.exports = {
  openapi: "3.0.3", // present supported openapi version
  info: {
    title: "Netweb MVP apis", // short title.
    description:
      "A set of apis that can be tested isolately from the application", //  desc.
    version, // version number
    contact: {
      name: "Netweb Tech", // your name
      url: "https://www.netwebtechnologies.com/", // your website
    },
  },
  schemes: ["http", "https"],
};
