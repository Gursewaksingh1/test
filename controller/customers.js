const { getCustomerModel } = require("../models/tenantModels/customers");
const { getOtpyModel } = require("../models/tenantModels/otp");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const envData = require("../utils/config");
exports.createCustomer = async (req, res) => {
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  try {

    let Customer = await getCustomerModel(tenantName);
    let customer;
    let password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);
    customer = new Customer({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });
    await customer.save();
    return res.status(200).send({ status: "success", data: customer });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};
exports.getAllCustomer = async (req, res) => {
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  try {
    let Customer = await getCustomerModel(tenantName);
    let customer = await Customer.find({
      $or: [{ disable: false }, { disable: undefined }],
    });
    res.status(200).send({ status: "success", data: customer });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};
exports.getCustomerById = async (req, res) => {
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  let id = req.params.id;
  try {
    let Customer = await getCustomerModel(tenantName);
    let customer = await Customer.findById({ _id: id });
    res.status(200).send({ status: "success", data: customer });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};
exports.login = async (req, res) => {
  let email = req.body.email || undefined;
  let phone = req.body.phone || undefined;
  let password = req.body.password;
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  try {
    let Customer = await getCustomerModel(tenantName);
    let customer = await Customer.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (!customer) {
      return res
        .status(400)
        .send({ status: "failed", msg: "invaild email or password" });
    } else {
      bcrypt.compare(password.toString(), customer.password).then((result) => {
        if (result) {
          //creating acces s token
          let token = jwt.sign(
            { customerName: customer.name, customerId: customer._id },
            envData.SECRET_CUSTOMER,
            { expiresIn: "1h" }
          );
          //creating refresh token
          let refreshToken = jwt.sign(
            { customerName: customer.name, customerId: customer._id },
            envData.REFRESH_TOKEN_SECRET_CUSTMOER,
            { expiresIn: "24h" }
          );

          res.status(200).send({
            status: "success",
            data: { token, refreshToken },
          });
        } else {
          res.status(400).send({
            status: "failed",
            statusCode: 400,
            error: "invalid email or password",
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const token = req.body.refreshToken;
    //checking if token is empty
    if (!token) {
      return res.status(403).send({
        status: "failed",
        statusCode: 403,
        error: "A token is required for authentication",
      });
    }
    //decoding token
    decoded = jwt.verify(token, envData.REFRESH_TOKEN_SECRET_CUSTMOER);
    //console.log(decoded);
    let newToken = jwt.sign(
      //generating new token
      { userName: decoded.customerName, userId: decoded.customerId },
      envData.SECRET_CUSTMOER,
      { expiresIn: 60 * 5 }
    );
    // user.token = newToken;
    // user.save();
    res.status(201).send({ status: "success", data: newToken });
    //   }
  } catch (err) {
    res.status(500).send({ status: "failed", error: err });
  }
};

exports.resetPassword = async (req, res) => {
  let { email, password, phone, newPassword, confirmPassword } = req.body;
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  try {
    let Customer = await getCustomerModel(tenantName);
    let customer = await Customer.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (!customer) {
      return res
        .status(400)
        .send({ status: "failed", msg: "invaild email or password" });
    } else {
      let result = await bcrypt.compare(password.toString(), customer.password);
      if (!result) {
        return res
          .status(400)
          .send({ status: "failed", msg: "invalid username or password" });
      }
      if (confirmPassword !== newPassword) {
        return res
          .status(400)
          .send({
            status: "failed",
            msg: "invaild new password and confirm password not matched",
          });
      } else {
        customer.password =  await bcrypt.hash(newPassword, 10);
      }
      customer.save();
     return  res.status(200).send({
        status: "success",
        message: "password updated",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};
exports.forgotPassword = async (req, res) => {
  let email = req.body.email;
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  let currentTime = new Date().getTime();
  let newOtp = otpGenerate();
  try {
    let Customer = await getCustomerModel(tenantName);
    let OTP = await getOtpyModel(tenantName);
    let customer = await Customer.findOne({ email: email });
    if (customer) {
      let otp = new OTP({
        otp: newOtp,
        generateDate: currentTime,
        expireIn: new Date(currentTime + 2 * 60 * 60 * 1000),
        customerId: customer._id,
      });
      await otp.save();
      return res
        .status(200)
        .send({ status: "success", message: "please your registered email" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};
exports.newPassword = async (req, res) => {
  let password = req.body.password;
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  let otp = req.body.otp;
  try {
    let Customer = await getCustomerModel(tenantName);
    let OTP = await getOtpyModel(tenantName);
    let otpData = await OTP.findOne({ otp: otp });
    if (otpData) {
      if (new Date() < new Date(otpData.expireIn)) {
        bcrypt.genSalt(10, function (err, Salt) {
          bcrypt.hash(password, Salt, function (err, hash) {
            hashedPassword = hash;
            Customer.findOneAndUpdate(
              { _id: otpData.customerId },
              {
                $set: {
                  password: hashedPassword,
                },
              }
            )
              .then((result) => {
                OTP.findOneAndDelete({ otp: otp }).then((success) => {
                  //console.log(success);
                });
                return res
                  .status(200)
                  .send({ status: "success", message: "new password created" });
              })
              .catch((err) => {
                console.log(err);
                return res.status(500).send({ status: "failed", error: err });
              });
          });
        });
      } else {
        return res
          .status(404)
          .send({ status: "failed", message: "otp expired" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};
function otpGenerate() {
  let digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
