const express = require('express');
const router = express.Router();
const cartModel = require('./cartModel');

router.get('/cart/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const products = await cartModel.find({ userId: userId });
        if (products.length > 0) {
            res.send(products);
        } else {
            res.status(404).json({ message: 'No products found for this user.' });
        }
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});

router.post('/add-product-cart', async (req, res) => {
    const {
        productName,
        productCompany,
        productImageUrl,
        size,
        price,
        quantity,
        userId
    } = req.body;

    if (!productName || !productCompany || !productImageUrl || !size || !price || !quantity || !userId) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const product = new cartModel({
            productName,
            productCompany,
            productImageUrl,
            size,
            price,
            quantity,
            userId
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ message: 'Error saving product. Please try again later.' });
    }
});
router.put('/cart/update/:productId', async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
        return res.status(400).json({ message: 'Invalid quantity.' });
    }

    try {
        const updatedProduct = await cartModel.findByIdAndUpdate(
            productId,
            { quantity },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});

router.delete('/delete-CartProduct/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract id from params
        const product = await cartModel.findByIdAndDelete(id); // Use id to delete the product

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json({ message: "Product deleted successfully.", product });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: "An error occurred while deleting the product.", error });
    }
})

module.exports = router;