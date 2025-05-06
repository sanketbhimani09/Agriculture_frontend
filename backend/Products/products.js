const express = require('express');
const router = express.Router();
const productModel = require('./productModel');

// Get products by category
router.get('/products/:categoryID', async (req, res) => {
    const { categoryID } = req.params;
    try {
        const products = await productModel.find({ categoryID: categoryID });
        if (products.length > 0) {
            res.json(products);
        } else {
            res.status(404).json({ message: 'No products found for this category.' });
        }
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});

// Add new product
router.post('/add-product', async (req, res) => {
    const { 
        productName, 
        productCompany, 
        productImageUrl, 
        categoryID, 
        Description, 
        variants 
    } = req.body;

    if (!productName || !productCompany || !productImageUrl || !categoryID || !variants) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const product = new productModel({
            productName,
            productCompany,
            productImageUrl,
            categoryID,
            Description,
            variants
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ message: 'Error saving product. Please try again later.' });
    }
});

// Update product
router.put('/update-product/:id', async (req, res) => {
    const { id } = req.params;
    const { productName, productCompany, productImageUrl, categoryID, Description, variants } = req.body;

    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { productName, productCompany, productImageUrl, categoryID, Description, variants },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: 'Error updating product. Please try again later.' });
    }
});

// Delete product
router.delete('/delete-product/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: 'Error deleting product. Please try again later.' });
    }
});

module.exports = router;
