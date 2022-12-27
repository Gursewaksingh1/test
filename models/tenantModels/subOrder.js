const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');

//schema of tenant
const subOrderSchema = new mongoose.Schema({
    quantity: Number,
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    slug:String,
    backgroundColor:String,
    openingTime:String,
    closingTime: String
}, { timestamps: true })


const getSubOrderModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("subOrder", subOrderSchema)
}

module.exports = {
    getSubOrderModel
    
}