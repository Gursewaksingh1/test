const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');

//schema of tenant
const restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    displayAddress: String,
    status:{
        type:String,
        enum:["ACTIVE","INACTIVE","OPEN", "CLOSE"],
        default: "ACTIVE"
    },
    logo:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "image"
    }],
    coverPhoto:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "image"
    }],
    restaurantBannersId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurantBanners"
    }],
    menu:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu"
    }],
    ratingId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "rating"
    }],
    slug:String,
    backgroundColor:String,
    openingTime:String,
    closingTime: String
}, { timestamps: true })


const getRestaurantModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("restaurant", restaurantSchema)
}

module.exports = {
    getRestaurantModel
    
}