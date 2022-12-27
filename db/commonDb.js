const { connect } = require('./dbConnection');
// const url = "mongodb+srv://user:pwd@wedlock-cluster.da3ng.mongodb.net/admindb";
const envData = require("../utils/config");
let url =  envData.MONGODB_URI_ADMIN;
let db;
const getDb = async () => {
    return db ? db : await connect(url)
}

module.exports = {
    getDb
}