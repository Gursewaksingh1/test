const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');

//schema of tenant
const driverSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    phone:Number,
    status:{
        type:String,
        enum: ["active","inactive"],
        default:"inactive"
    }
}, { timestamps: true })


const getDriverModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("driver", driverSchema)
}

module.exports = {
    getDriverModel
    
}