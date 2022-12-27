const { body, check } = require("express-validator");

const customers = () => {
  return [
    body("name")
    .notEmpty()
    .isString()
    .withMessage("name must be not empty and it should be a string"),
    body("email")
    .notEmpty()
    .isEmail()
    .withMessage("email must be not empty and its structure must be an email"),
    body("phone")
    .notEmpty()
    .isNumeric()
    .withMessage("phone must be not empty and it should be a number")
    .isLength({ min: 10, max:10 })
    .withMessage("phone number must be in 10 digits only"),
    body("password")
      .notEmpty()
      .withMessage("password must be not empty")
      .isLength({ min: 8, max:500 })
      .withMessage("password must be 8 characters long"),
      body("confirmPassword")
      .notEmpty()
      .withMessage("confirmPassword must be not empty")
      .custom(async (confirmPassword, { req }) => {
        if ( req.body.password != confirmPassword) {
          throw Error("password and confirm-password not matched");
        }
        return confirmPassword;
      }),
  ];
};
const restpassword = () => {
  return [
    body("email")
    .notEmpty()
    .isEmail()
    .withMessage("email must be not empty and its structure must be an email"),
    body("password")
      .notEmpty()
      .isString()
      .withMessage("password must be not empty")
      .isLength({ min: 8, max:500 })
      .withMessage("password must be 8 characters long"),
    body("newPassword")
    .notEmpty()
    .isString()
    .withMessage("newPassword must be not empty and it should be a string")
    .isLength({ min: 8, max:500 })
    .withMessage("newPassword must be 8 characters long"),
      body("confirmPassword")
      .notEmpty()
      .withMessage("confirmPassword must be not empty")
      .custom(async (confirmPassword, { req }) => {
        if ( req.body.newPassword != confirmPassword) {
          throw Error("newPassword and confirm-password not matched");
        }
        return confirmPassword;
      }),
  ];
};

const restaurant = () => {
  return [
    body("name")
    .notEmpty()
    .isString()
    .withMessage("name must be not empty and must be a string"),
    body("address")
      .notEmpty()
      .isString()
      .withMessage("address must be not empty and must be a string")
      .isLength({ min: 6, max:500 })
      .withMessage("address must be 6 characters long"),
      body("displayAddress")
      .notEmpty()
      .isString()
      .withMessage("displayAddress must be not empty and must be a string")
      .isLength({ min: 6, max:500 })
      .withMessage("displayAddress must be 6 characters long"),
    body("slug")
    .notEmpty()
    .isString()
    .withMessage("slug must be not empty and it should be a string"),
      body("backgroundColor")
      .notEmpty()
      .isString()
      .withMessage("backgroundColor must be not empty and must be a string"),

      body("openingTime")
      .notEmpty()
      .isString()
      .withMessage("openingTime must be not empty and must be a string example 9 am"),
      body("closingTime")
      .notEmpty()
      .isString()
      .withMessage("closingTime must be not empty and must be a string example 9 pm"),
      body("status")
      .notEmpty()
      .isString()
      .withMessage("status must be not empty and must be a string"),
  ];
};
const restaurantBanner = () => {
  return [
    body("name")
    .notEmpty()
    .isString()
    .withMessage("name must be not empty and must be a string"),
    body("desc")
      .notEmpty()
      .isString()
      .withMessage("desc must be not empty and must be a string")
      .isLength({ min: 6, max:500 })
      .withMessage("desc must be 6 characters long"),
      body("backgroundColor")
      .notEmpty()
      .isString()
      .withMessage("backgroundColor must be not empty and must be a string"),
      body("restaurantName")
      .notEmpty()
      .isString()
      .withMessage("restaurantName must be not empty and must be a string"),
  ];
};
const menuCategory = () => {
  return [
    body("name")
    .notEmpty()
    .isString()
    .withMessage("name must be not empty and must be a string"),
    body("description")
      .isString()
      .withMessage("description must be type string"),
  ];
};
//not used
// const orders = () => {
//   return [
//     check("page")
//       //.trim()
//       .custom(async (page, { req }) => {
//         page = parseInt(page);
//         var reg = /^\d+$/; //checking if string only contains number or not
//         const user = await User.findOne({ _id: req.user.userId });
//         if (page == undefined || null) {
//           return page;
//         }

//         page = page.trim();
//         if (!reg.test(page)) {
//           if (user.Language == 1) {
//             throw Error(`page must not be empty and it should be number`);
//           } else if (user.Language == 2) {
//             throw Error(`page no debe estar vacío y debe ser una número`);
//           } else {
//             throw Error(`page must not be empty and it should be number`);
//           }
//         }
//         if (page < 1) {
//           if (user.Language == 1) {
//             throw Error(`page number must be natural number`);
//           } else if (user.Language == 2) {
//             throw Error(`page número debe ser número natural`);
//           } else {
//             throw Error(`page number must be natural number`);
//           }
//         }
//         return page;
//       }),
//   ];
// };

// const order = () => {
//   return [
//     check("orderId")
//       .trim()
//       .custom(async (orderId, { req }) => {
//         const user = await User.findOne({ _id: req.user.userId });
//         const language = await Language.findOne({ language_id: user.Language });
//         const langObj = JSON.parse(language.language_translation);
//         langObj.validation_text = langObj.validation_text.replace(
//           "$fieldName",
//           "orderId"
//         );
//         langObj.validation_text = langObj.validation_text.replace(
//           "$datatype",
//           "string"
//         );
//         customVerifyLength(orderId, user, 1, langObj.validation_text);

//         return orderId;
//       }),
//     check("storeId")
//       .trim()
//       .custom(async (storeId, { req }) => {
//         const user = await User.findOne({ _id: req.user.userId });
//         const language = await Language.findOne({ language_id: user.Language });
//         const langObj = JSON.parse(language.language_translation);
//         langObj.validation_text = langObj.validation_text.replace(
//           "$fieldName",
//           "storeId"
//         );
//         langObj.validation_text = langObj.validation_text.replace(
//           "$datatype",
//           "string"
//         );
//         customVerifyLength(storeId, user, 1, langObj.validation_text);

//         return storeId;
//       }),
//   ];
// };

module.exports = {
    customers,
    restpassword,
    restaurant,
    restaurantBanner,
    menuCategory
};
