const {getTenantModel} = require("../models/commonModels/tenant");
const { v4: uuidv4 } = require('uuid');
exports.createTenant = async (req, res, next) => {
    try {
      let Tenant = await getTenantModel();
      const tenant = new Tenant({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        uuid: uuidv4()
      });
       tenant.save()
      return res.status(200).send({ status: "success", tenant });
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: "failed", error: err });
    }
  };