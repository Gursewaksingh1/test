const { connect } = require('./dbConnection');
// const url = "mongodb+srv://user:pwd@wedlock-cluster.da3ng.mongodb.net";
const envData = require("../utils/config");
let url =  envData.MONGODB_URI_TENANT;
let db;

const getTenantDB = async (tenantId) => {
    const dbName = `deliveryApp-${tenantId}`;
    db = db ? db : await connect(url)
    let tenantDb = db.useDb(dbName, { useCache: true });
    return tenantDb;
}

module.exports = {
    getTenantDB
}