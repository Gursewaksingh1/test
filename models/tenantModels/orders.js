const { getTenantDB } = require("../../db/tenantDb");
const mongoose = require("mongoose");

//schema of tenant
const ordersSchema = new mongoose.Schema(
  {
    customerName: String,
    phone: Number,
    email: String,
    address: String,
    estimatedTime: String,
    totalPrice: Number,
    orderTiem: Date,
    deliveryMode: String,   //we will discuss about deliverymode 
    paymentMethod: String, // we will discuss about payment method
    orderPrepTime: Date,
    status: {
      type: String,
      enum: [
        "CART",
        "PROCESSED",
        "ON WAY",
        "DELIVERED",
        "CANCELLED",
        "PENDING",
      ],
      default: "CART",
    },
    subOrder: [
      [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subOrder",
      }],
    ],
  },
  { timestamps: true }
);

const getOrdersModel = async (tenantId) => {
  const tenantDb = await getTenantDB(tenantId);
  return tenantDb.model("orders", ordersSchema);
};

module.exports = {
  getOrdersModel,
};
