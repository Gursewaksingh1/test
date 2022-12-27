const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: {type:String, unique: true},
    phone:Number,
    Role: {
        type: String,
        enum: ["admin", "manager"],
        default: "admin"
    },
    restaurantId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant"
    }]
}, { timestamps: true })


const getAdminModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("Admin", adminSchema)
}

module.exports = {
    getAdminModel
    
}