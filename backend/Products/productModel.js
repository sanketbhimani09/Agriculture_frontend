const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productCompany: {
        type: String,
        required: true,
    },
    productImageUrl: {
        type: String,
        required: true,
    },
    categoryID: {
        type: String,
        ref: 'categories', // Reference to categories collection
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    variants: {
        type: [variantSchema], // Array of variant sub-documents
        required: true,
    }
});

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;
