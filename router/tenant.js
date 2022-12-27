const express = require("express");
const router = express.Router();
const tenantController = require("../controller/tenant");
// const {createUser} = require("../validations/validationAPI");
// let validation = require("../validations/validationMiddleware");
const isAuth = require("../middleware/isAuth")
// router.get("/",userController.getUsers);
router.post("/",tenantController.createTenant);
// router.put("/",createUser(),validation,userController.updateUser);
// router.delete("/",isAuth,userController.deleteUser);
// router.post("/login",userController.login);

module.exports = router;