const express = require('express');
const router = express.Router();
const User = require('./userModel');

router.get('/users', async (req, res) => {
    User.find({}).then(function (data) {
        if (data.length > 0) {
            res.send(data)
        } else {
            res.status(404).json({ message: "No Users found" });
        }
    }).catch(function (error) {
        console.error("Error fetching technology:", error);
        res.status(500).json({ message: "Internal server error" });
    })
})

router.post('/add-user', async (req, res) => {
    const { Username, ContactNo, Email, Password } = req.body;

    if (!Username || !ContactNo || !Email || !Password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const newUser = new User({ Username, ContactNo, Email, Password });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/checkUser', async (req, res) => {
    const { Username, Password } = req.body;

    if (!Username || !Password) {
        return res.status(400).send({ message: "Username and Password are required" });
    }

    try {
        const user = await User.findOne({ Username });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        if (user.Password === Password) {
            return res.status(200).send({ userID: user._id, UserName:user.Username,message: "Login successful" });
        } else {
            return res.status(401).send({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error during user check:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

module.exports = router;
