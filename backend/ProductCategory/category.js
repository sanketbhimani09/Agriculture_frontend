const express = require('express');
const router = express.Router();
const categoryModel = require('./categoryModel');

// Get all categories
router.get('/categories', async (req, res) => {
    categoryModel.find({}).then(function (data) {
        if (data.length > 0) {  
            res.json(data);
        } else {
            res.status(404).json({ message: "No technology found" });
        }
    }).catch(function (err) {
        console.error("Error fetching technology:", err);
        res.status(500).json({ message: "Internal server error" });
    });
});

// Add new category
router.post('/add-category', async (req, res) => {
    const { categoryName, imageUrl } = req.body;
    try {
        const category = new categoryModel({
            categoryName: categoryName,
            imageUrl: imageUrl
        });
        const savedCategory = await category.save();
        res.send(savedCategory);
    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).send("Error saving category");
    }
});
// Delete a category by ID
router.delete('/delete-category/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await categoryModel.findByIdAndDelete(id);
        if (deletedCategory) {
            res.status(200).json({ message: "Category deleted successfully", deletedCategory });
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Edit category by ID
router.put('/edit-category/:id', async (req, res) => {
    const { id } = req.params; // Get the category ID from the route
    const { categoryName, imageUrl } = req.body; // Extract the updated data from the request body

    try {
        // Find the category by ID and update it
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            { categoryName, imageUrl },
            { new: true, runValidators: true } // Return the updated document and validate the data
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(updatedCategory); // Send the updated category back to the client
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Error updating category' });
    }
});
// app.use("/",this.route);
module.exports = router;
