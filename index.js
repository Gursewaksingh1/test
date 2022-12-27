require("dotenv").config();
const envData = require("./utils/config")
const port = envData.PORT ||2000;
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const swaggerUI = require("swagger-ui-express");
const tenantRouter = require("./router/tenant");
const adminRouter = require("./router/admin");
const customerRouter = require("./router/customers");
const swaggerDocument = require("./swagger");

// const storage = multer.memoryStorage();
//check if public & file exist or not
app.use((req, res, next) => {
  path.join(__dirname, "public", "image");
  if (fs.existsSync(path.join(__dirname, "public", "image"))) {
    //console.log("exist");
  } else {
    //console.log("!exist");
    if (fs.existsSync(path.join(__dirname, "public"))) {
      fs.mkdirSync(path.join(__dirname, "public", "image"));
    } else {
      fs.mkdirSync(path.join(__dirname, "public"));
      fs.mkdirSync(path.join(__dirname, "public", "image"));
    }
  }
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image");
  },
  filename: (req, file, cb) => {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, uuidv4() + "." + extension);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    //  console.log("Only .png, .jpg and .jpeg format allowed!");
  }
};
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  multer({ storage: storage, fileFilter }).fields([
    { name: "image", maxCount: 10 },
    { name: "logo", maxCount: 10 },
    { name: "cover", maxCount: 10 },
    { name: "banner", maxCount: 10 },
  ])
);

// app.use((req, res, next) => {
//   res.append("Access-Control-Allow-Origin", ["*"]);
//   res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.append("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/tenant", tenantRouter);
app.use("/admin", adminRouter);
app.use("/user", customerRouter);
app.use("/", (req, res) => {
  res.send("Welcome to netweb tech mvp docs, Go to /docs to see all apis");
});
app.use((req, res) => {
  res.send("invalid endpoint please check http method and url");
});
// app.use((err, req, res, next) => {
//   res.status(404).send({
//     status: "failed",
//     statusCode: 404,
//     error: "wrong URL please check your URL and http method",
//   });
// });
app.listen(port, () => {
  console.log(`Server listening on port - ${port}`);
});
