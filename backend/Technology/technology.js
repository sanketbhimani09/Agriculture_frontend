const express = require('express');
const router = express.Router();
const technologyModel = require('./technologyModel'); // Corrected path

// GET all technology data
router.get("/technology", (req, res) => {
    technologyModel.find({}).then(function (form_data) {
        if (form_data.length > 0) {
            res.json(form_data);
        } else {
            res.status(404).json({ message: "No technology found" });
        }
    }).catch(function (err) {
        console.error("Error fetching technology:", err);
        res.status(500).json({ message: "Internal server error" });
    });
});

// POST new technology data
router.post("/add-tech", async (req, res) => {
    const { image, title, description, link } = req.body;
    try {
        const newTech = new technologyModel({
            image,
            title,
            description,
            link
        });
        const savedTech = await newTech.save();
        res.send(savedTech);
    } catch (error) {
        console.error("Error saving technology:", error);
        res.status(500).send("Error saving technology");
    }
});

// PUT update technology by ID
router.put("/edit-tech/:id", async (req, res) => {
    try {
        const updatedTech = await technologyModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (updatedTech) {
            res.json({ message: "Technology updated successfully", updatedTech });
        } else {
            res.status(404).json({ message: "Technology not found" });
        }
    } catch (error) {
        console.error("Error updating technology:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// DELETE technology by ID
router.delete("/delete-tech/:id", async (req, res) => {
    try {
        const deletedTech = await technologyModel.findByIdAndDelete(req.params.id);
        if (deletedTech) {
            res.json({ message: "Technology deleted successfully" });
        } else {
            res.status(404).json({ message: "Technology not found" });
        }
    } catch (error) {
        console.error("Error deleting technology:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
