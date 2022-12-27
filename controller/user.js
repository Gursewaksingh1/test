let {common_db,construct_pool} = require("../db");
const jwt = require("jsonwebtoken");
exports.getUsers = async (req, res, next) => {
  try {

    res.status(200).send({ status: "success", users:"data done" });
  } catch (err) {
    res.status(500).send({ status: "failed", error: err });
  }
};

exports.createUser = async (req, res, next) => {
  try {

    // user.save()
    return res.status(200).send({ status: "failed", user:"" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "failed", error: err });
  }
};

exports.updateUser = async (req, res, next) => {
    try {
        // const user  = await User.update({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password
        // },{ where: { id: req.body.id } });
        res.status(200).send({status:"success", data: "user"})
    } catch (err) {
        console.log(err);
        res.status(500).send({status: "failed", error: err})
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        // let id = req.body.id;
        // const user = await User.destroy({where: {id: id}});
        //console.log({user});
        if(user == 1) {
            return res.status(200).send({status: "success", msg: "user deletd"});
        } else {
            return res.status(404).send({status: "success", msg: "user not exist"});

        }
    } catch (err) {
       console.log(err);
       res.status(500).send({status: "failed", error: err}); 
    }
}

exports.login = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;  
  try {
        // let user = await User.findAll({email:email, password: password});
        // if(user.length === 0) {
        //   return res.status(400).send({status:"failed", msg:"invaild email or password"});
        // } else {
        //   let token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),user: user.id, name: user.name},"thisismygoodsecret@@@");
        //   console.log(token);
          return res.status(200).send({status:"success", token:""})
        // }
    } catch (err) {
        console.log(err);
        res.status(500).send({status: "failed", error: err});
    }
}