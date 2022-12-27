let {body, check} = require("express-validator");
function createUser() {
    return [
        body("name").isString().notEmpty().withMessage("user name must be a string and not empty"),
        body("email").isEmail().notEmpty().withMessage("email must be a email and not empty"),
        body("password").isString().notEmpty().withMessage("user password must be a string and not empty"),        
    ]
}

module.exports = {
    createUser 
}