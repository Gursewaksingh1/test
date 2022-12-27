const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');

//schema of tenant
const otpSchema = new mongoose.Schema({
    otp: String,
    generateDate:Date,
    expireIn: Date,
    customerId: String
}, { timestamps: true })


const getOtpyModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("otp", otpSchema)
}

module.exports = {
    getOtpyModel
    
}