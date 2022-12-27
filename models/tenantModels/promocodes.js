const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');

//schema of tenant
const promocodeSchema = new mongoose.Schema({
    code: String,
    promoName: String,
    type: {
        type:String,
        enum:["PERCENTAGE","FLAT DISCOUNT"],
        default: "PERCENTAGE"
    },
    value: String,
    maxDiscount:Number,
    minDiscount:Number,
    startDate:Date,
    endDate:Date,
    desc: String,
    allowMultipleTime: Boolean,
    promoApplicableOnOrderNo: Number,
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant"
    }
}, { timestamps: true })


const getPromocodeModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("promocode", promocodeSchema)
}

module.exports = {
    getPromocodeModel
    
}