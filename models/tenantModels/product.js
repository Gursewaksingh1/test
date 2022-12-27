const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');

//schema of tenant
const productSchema = new mongoose.Schema({
    name: String,
    searcTag: String,   // we can have sepaerate collection or use enum type for this 
    price: Number,
    costPrice:Number,
    discount:Boolean,
    preparationTime:Number,
    discountPercent:Number,
    description:String,
    SKU:String,
    minQty:Number,
    maxQty:Number,
    inventory:String,
    status: {
        type:String,
        enum:["active","inactive"],
        default:"active"
    },
    image:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "image"
    },
    subCategoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
    },
    menuId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu",
    },
    discountId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "discount"
    },
    ratingId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "rating"
    }]
}, { timestamps: true })


const getProductModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("product", productSchema)
}

module.exports = {
    getProductModel
    
}