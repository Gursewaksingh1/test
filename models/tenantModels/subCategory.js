const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');

//schema of tenant
const subCategorySchema = new mongoose.Schema({
    name: String,
    description:String,
    image:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "image"
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    productIds:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    }
}, { timestamps: true })


const getSubCategoryModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("subCategory", subCategorySchema)
}

module.exports = {
    getSubCategoryModel
    
}