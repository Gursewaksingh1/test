const { getTenantModel } = require("../models/commonModels/tenant");
const envData = require("../utils/config");
checkTenant = async (req, res, next) => {
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  let Tenant = await getTenantModel();
  let tenant = await getTenant(Tenant, tenantName);
  if (!tenant) {
    return res
      .status(404)
      .send({ status: "failed", error: "tenant name wrong" });
  }
  next();
};
async function getTenant(Tenant, name) {
  let tenant = await Tenant.findOne({ name: name });
  return tenant;
}

module.exports = checkTenant;
