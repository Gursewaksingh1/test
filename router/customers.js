const express = require("express");
const router = express.Router();
const customerController = require("../controller/customers");
const {customers,restpassword} = require("../validation/validationRules");
let validate = require("../validation/validationMiddleware");
const isAuth = require("../middleware/isAuthForCustomer");
const checkTenant = require("../middleware/checkTenant")
// router.get("/",userController.getUsers);
router.post("/signup",checkTenant,
customers(),
validate,
customerController.createCustomer);
router.get("/",checkTenant,isAuth,
customerController.getAllCustomer);
router.get("/:id",checkTenant,isAuth,
customerController.getCustomerById);
router.post("/login",checkTenant,
customerController.login);
router.put("/refreshtoken", checkTenant,
customerController.refreshToken);
router.put("/restpassword",restpassword(),isAuth,
validate,checkTenant,
customerController.resetPassword);
router.post("/forgotpassword",checkTenant,
customerController.forgotPassword);
router.post("/newpassword",checkTenant,
customerController.newPassword);
module.exports = router;