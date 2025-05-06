const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    }
});

const categoryModel = mongoose.model('categories', categorySchema);

module.exports = categoryModel;
