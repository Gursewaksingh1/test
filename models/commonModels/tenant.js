const { getDb } = require('../../db/commonDb');
const mongoose = require('mongoose');

//schema of tenant
const tenantSchema = new mongoose.Schema({
    name: {type:String, unique: true},
    uuid: String,
    password: String,
    email: String,
    plan: {
        amount: Number,
        planName: String,
        startDate: Date,
        type: {
            type:String,
            enum:["Single merchant","multi merchant","storefront"],
            default:"Single merchant"
        },
    },
    domainName: String
}, { timestamps: true })


const getTenantModel = async () => {
    const adminDb = await getDb();
    return adminDb.model("tenants", tenantSchema)
}

module.exports = {
    getTenantModel
    
}