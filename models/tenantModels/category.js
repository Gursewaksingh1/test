const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');

//schema of tenant
const categorySchema = new mongoose.Schema({
    name: String,
    description:String,
    image:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "image"
    },
    menuId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu",
        required: true
    },
    subCategoryIds:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
    }]
}, { timestamps: true })


const getCategoryModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("category", categorySchema)
}

module.exports = {
    getCategoryModel
    
}