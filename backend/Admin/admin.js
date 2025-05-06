const express = require('express');
const router = express.Router();
const Admin = require('./adminModel'); // Import the Admin model

// Get all admins
router.get('/admins', async (req, res) => {
    Admin.find({}).then(function (data) {
        if (data.length > 0) {
            res.send(data);
        } else {
            res.status(404).json({ message: "No Admins found" });
        }
    }).catch(function (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ message: "Internal server error" });
    });
});

// Add a new admin
router.post('/add-admin', async (req, res) => {
    try {
        const admin = new Admin({
            Username: req.body.Username,
            Password: req.body.Password
        });
        await admin.save();
        res.json(admin);
    } catch (error) {
        console.error("Error saving admin:", error);
        res.status(500).send("Error saving admin");
    }
});

router.post('/checkAdmin', async (req, res) => {
    const { Username, Password } = req.body;

    if (!Username || !Password) {
        return res.status(400).send({ message: "Username and Password are required" });
    }

    try {
        // Find the admin by username
        const admin = await Admin.findOne({ Username });
        if (!admin) {
            return res.status(404).send({ message: "Admin not found" });
        }

        // Compare the plain text password
        if (admin.Password === Password) {
            return res.status(200).send({ adminID: admin._id,AdminName:admin.Username, message: "Login successful" });
        } else {
            return res.status(401).send({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error during admin check:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});


module.exports = router;
