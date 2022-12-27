const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');

//schema of tenant
const discountSchema = new mongoose.Schema({
    discountName: String,
    discount: String,
    maxDiscount:Number,
    minDiscount:Number,
    startDate:Date,
    endDate:Date,
    desc: String,
   
}, { timestamps: true })


const getDiscountModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("discount", discountSchema)
}

module.exports = {
    getDiscountModel
    
}