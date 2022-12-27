const { getTenantDB } = require('../../db/tenantDb');
const mongoose = require('mongoose');

//schema of tenant
const ratingSchema = new mongoose.Schema({
    rating: Number,
}, { timestamps: true })


const getRatingModel = async (tenantId) => {
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("rating", ratingSchema)
}

module.exports = {
    getRatingModel
    
}