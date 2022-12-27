const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema({
    name: String,
    image:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "image"
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant"
    },
    categoryIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }],
}, { timestamps: true }) 


const getMenuModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("menu", menuSchema)
}

module.exports = {
    getMenuModel
    
}