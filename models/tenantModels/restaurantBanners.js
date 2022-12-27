const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');

//schema of tenant
const restaurantBannersSchema = new mongoose.Schema({
    name: String,
    desc:String,
    backgroundColor:String,
    restaurantName: String,
    externallink:String,
    restaurantId: String,
    banner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "image"
    },
}, { timestamps: true })


const getRestaurantBannersModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("restaurantBanners", restaurantBannersSchema)
}

module.exports = {
    getRestaurantBannersModel
    
}