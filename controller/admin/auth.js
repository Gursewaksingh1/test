const { getAdminModel } = require("../../models/tenantModels/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const envData = require("../../utils/config");
exports.createUser = async (req, res) => {
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  try {
    let User = await getAdminModel(tenantName);
    let password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      Role: req.body.role,
    });
    await user.save();
    return res.status(200).send({ status: "success", user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};
exports.login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let tenantName = req.headers["subdomain"] || envData.DEFAULT_TENANT;
  try {
    let User = await getAdminModel(tenantName);
    let user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .send({ status: "failed", msg: "invaild email or password" });
    } else {
      bcrypt.compare(password.toString(), user.password).then((result) => {
        if (result) {
          //creating acces s token
          let token = jwt.sign(
            { userName: user.name, userId: user._id },
            envData.SECRET,
            { expiresIn: "1h" }
          );
          //creating refresh token
          let refreshToken = jwt.sign(
            { userName: user.name, userId: user._id },
            envData.REFRESH_TOKEN_SECRET,
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
