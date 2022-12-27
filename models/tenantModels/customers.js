const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');

//schema of tenant
const customerSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: {type:String, unique: true},
    phone:Number,
    disable:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })


const getCustomerModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("customer", customerSchema)
}

module.exports = {
    getCustomerModel
    
}