const { info, openapi } = require("./config/info");
const { servers } = require("./config/servers");
const { components } = require("./config/components");
const { security } = require("./config/security");
const { paths } = require("./modules");

const definition = {
  openapi,
  info,
  servers,
  components,
  paths,
  security,
};

module.exports = definition;
