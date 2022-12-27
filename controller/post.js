let {common_db,construct_pool} = require("../db");
exports.getPosts = (req, res, next) => {
    try {
        
    } catch (err) {
        res.status(500).send({status:"failed", error: err})
    }
};

exports.createPost =async (req, res, next) => {
    try {
      
    } catch (err) {
        res.status(500).send({status:"failed", error: err})
    }
}