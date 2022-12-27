const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');

//schema of tenant
const driverSchema = new mongoose.Schema({
    minOrderAmount: Number,
    maxEarnPoint: Number,
    expiryDate: Date,
    minLoyaltyPointForRedemption:Number,
    minOrderAmountForRedemption:Number,
    maxRedemptionAmountForPercentage:Number,
    earningCriteria:String, // usage of these are unknown
    redemptionCriteria: String
    // status:{
    //     type:String,
    //     enum: ["active","inactive"],
    //     default:"inactive"
    // }
}, { timestamps: true })


const getDriverModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("driver", driverSchema)
}

module.exports = {
    getDriverModel
    
}