const {validationResult} = require("express-validator");
const validation = (req, res, next) => {
    const errors = validationResult(req);
    if(errors. isEmpty()) {
        return next();
    }
    let extractedErrors = [];
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg }));

    return res.status(422).send({status: "failed", error: extractedErrors});
}
module.exports = validation;