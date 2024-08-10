const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
//demo
const app = express();
const port = 5000;

app.use(express.json());
// app.use(cors());
mongoose.connect("mongodb://localhost:27017/griculture");

const technologyModel=require('./technology');

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get("/technology", (req, res) => {
    technologyModel.find({}).then(function (form_data) {
        if (form_data.length > 0) {
            res.json(form_data);
        } else {
            res.status(404).json({ message: "No orders found" });
        }
    }).catch(function (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ message: "Internal server error" });
    });
});

app.post("/add-tech", async (req, res) => {
    const { image, title, description } = req.body;
    try {
        const technologySchema = new technologyModel({
            image: image,
            title: title,
            description: description
        });
        const savedContact = await technologySchema.save();
        res.send(savedContact);
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).send("Error saving contact");
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
