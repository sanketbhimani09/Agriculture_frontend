const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productCompany: { type: String, required: true },
    productImageUrl: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    userId: { type: String, required: true }
});

const cartModel = mongoose.model("cart_datas", cartSchema)
module.exports = cartModel