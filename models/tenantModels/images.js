const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');

//schema of tenant
const imageSchema = new mongoose.Schema({
   image:String
}, { timestamps: true })


const getImageModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("image", imageSchema)
}

module.exports = {
    getImageModel
    
}