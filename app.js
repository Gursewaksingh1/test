const express = require("express");
const app = express();
// const bodyparser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const _URI = process.env.MONGODB_URI 
// const sequelize = require("./db");
const cors = require("cors");
// const User = require("./models/user");
// const Post = require("./models/post");
// const comment = require("./models/comments");
// const tag_posts = require("./models/tag_posts");
// const tags = require("./models/tags");
const userRouter = require("./router/user");
const postRouter = require("./router/post");
app.use(express.json());
app.use(cors());
app.use("/",userRouter);
app.use("/post",postRouter);

mongoose.connect(_URI)
  .then(result => {
     console.log(result)
   
    app.listen(port, () => {
      console.log(`listen on ${port}`);
    });
  })
  .catch(err => console.log(err))

