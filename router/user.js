const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const {createUser} = require("../validations/validationAPI");
let validation = require("../validations/validationMiddleware");
const isAuth = require("../middleware/isAuth")
router.get("/",userController.getUsers);
router.post("/",createUser(),validation,userController.createUser);
router.put("/",createUser(),validation,userController.updateUser);
router.delete("/",isAuth,userController.deleteUser);
router.post("/login",userController.login);

module.exports = router;