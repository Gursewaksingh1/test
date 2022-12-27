const express = require("express");
const router = express.Router();
const authController = require("../controller/admin/auth");
const restaurantController = require("../controller/admin/restaurant");
const restaurantBannerController = require("../controller/admin/restaurantBanner");
const restaurantMenuController = require("../controller/admin/restaurantMenu");
const checkTenant = require("../middleware/checkTenant")
const {restaurant, restaurantBanner, menuCategory} = require("../validation/validationRules");
let validate = require("../validation/validationMiddleware");

const isAuth = require("../middleware/isAuth")
router.post("/",checkTenant,authController.createUser);

 router.post("/restaurant",
 checkTenant,
 isAuth,
 restaurant(),
 validate, restaurantController.addRestaurent);

 router.put("/restaurant",
 checkTenant,
 isAuth,
 restaurant(),
 validate, restaurantController.updateRestaurent);

 router.get("/restaurant",
 checkTenant,
 isAuth,
 restaurantController.getRestaurant);

 router.get("/restaurant/:id",
 checkTenant,
 isAuth,
 restaurantController.getRestaurantById);

 //restaurant banner APIs
 router.post("/restaurantbanner",
 checkTenant,
 isAuth,
 restaurantBanner(),
 validate,
 restaurantBannerController.addBanner);
 router.get("/restaurantbanner/:restaurantId",
 checkTenant,
 isAuth,
 restaurantBannerController.getBannerbyRestaurantId);
 router.delete("/restaurantbanner",
 checkTenant,
 isAuth,
 restaurantBannerController.deleteBanner);

 //menu APIs
 router.post("/restaurantmenu",
 checkTenant,
 isAuth,
 restaurantMenuController.addMenu);

 router.put("/restaurantmenu",
 checkTenant,
 isAuth,
 restaurantMenuController.updateMenu);

 router.delete("/restaurantmenu",
 checkTenant,
 isAuth,
 restaurantMenuController.deleteMenuByRestaurantIdOrMenuId);


 router.get("/restaurantmenu",
 checkTenant,
 isAuth,
 restaurantMenuController.getMenuByRestaurantIdOrMenuId);

 //category APIs
 router.post("/menucategory", menuCategory(),
 validate,
 checkTenant,
 isAuth,
 restaurantMenuController.addCategory);

 router.put("/menucategory", menuCategory(),
 validate,
 checkTenant,
 isAuth,
 restaurantMenuController.updateCategory);

 router.get("/menucategory",
 checkTenant,
 isAuth,
 restaurantMenuController.getCategoryByMenuIdOrCategoryId);
// login
 router.post("/login",checkTenant, authController.login);
module.exports = router;
