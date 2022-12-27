const jwt = require("jsonwebtoken");
const envData = require("../utils/config");
isAuth = async (req, res, next) => {
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .send({
        status: "failed",
        error: "A token is required for authentication",
      });
  }
  try {
    data = jwt.verify(token, envData.SECRET_CUSTOMER);
      req.user = data;
      next();
    // }
  } catch (err) {
    return res.status(403).send({ status: "failed", error: `${err.name}, ${err.message} `});
  }
};

module.exports = isAuth;
