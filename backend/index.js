const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const technologyRoutes = require('./Technology/technology'); 
const categoriesRoutes = require('./ProductCategory/category');
const productRoutes = require('./Products/products');
const userRoutes = require('./User/user');
const adminRoutes=require('./Admin/admin');
const cartRoutes=require('./Cart/cart');
const pendingOrders=require('./Orders/Orders');
const messages=require('./ContactUs/message');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://sanketbhimani92:sanketatlas9@cluster0.jh7pq.mongodb.net/Agriculture_Database?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Use the all routes
app.use(technologyRoutes);
app.use(categoriesRoutes);
app.use(productRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use(cartRoutes);
app.use(pendingOrders);
app.use(messages);

// Start the server
app.listen(port, () => {
    console.log(`Server is running  at http://localhost:${port}`);
});
