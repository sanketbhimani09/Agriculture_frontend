const express = require('express');
const router = express.Router();
const PendingOrder = require('./OrdersModel'); // Import your Mongoose model

// Get all pending orders
router.get('/pending-orders', async (req, res) => {
    try {
        const pendingOrders = await PendingOrder.find({ status: 'Pending' });
        if (pendingOrders.length > 0) {
            res.json(pendingOrders);
        } else {
            res.status(404).json({ message: 'No pending orders found.' });
        }
    } catch (err) {
        console.error('Error fetching pending orders:', err);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});

//Get all completed orders
router.get('/completed-orders', async (req, res) => {
    try {
        const completeOrders = await PendingOrder.find({ status: 'Completed' });
        if (completeOrders.length > 0) {
            res.json(completeOrders);
        } else {
            res.status(404).json({ message: 'No complete orders found.' });
        }
    } catch (err) {
        console.error('Error fetching complete orders:', err);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});

// Add a new order
router.post('/add-order', async (req, res) => {
    const {
        fullName,
        mobileNo,
        email,
        street,
        pincode,
        city,
        district,
        state,
        productName,
        size,
        price,
        quantity,
        status
    } = req.body;

    // Check if any of the required fields are missing
    if (!fullName || !mobileNo || !email || !street || !pincode || !city || !district || !state || !productName || !size || !price || !quantity) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        // Create the new order with all the required fields
        const newOrder = new PendingOrder({
            fullName,
            mobileNo,
            email,
            street,
            pincode,
            city,
            district,
            state,
            productName,
            size,
            price,
            quantity,
            status: status || 'Pending' // Default to 'Pending' if not provided
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ message: 'Error saving order. Please try again later.' });
    }
});

// Delete multiple selected orders
router.post('/delete-orders', async (req, res) => {
    const { orderIds } = req.body; // Expecting an array of order IDs

    if (!orderIds || orderIds.length === 0) {
        return res.status(400).json({ message: 'No orders selected for deletion.' });
    }

    try {
        await PendingOrder.deleteMany({ _id: { $in: orderIds } });
        res.json({ message: 'Selected orders deleted successfully.' });
    } catch (error) {
        console.error('Error deleting orders:', error);
        res.status(500).json({ message: 'Error deleting orders. Please try again later.' });
    }
});
// Update status of selected orders from 'Pending' to 'Completed'
router.post('/update-orders', async (req, res) => {
    const { orderIds } = req.body; // Expecting an array of order IDs

    if (!orderIds || orderIds.length === 0) {
        return res.status(400).json({ message: 'No orders selected for update.' });
    }

    try {
        await PendingOrder.updateMany(
            { _id: { $in: orderIds } },
            { $set: { status: 'Completed' } }
        );
        res.json({ message: 'Selected orders updated to Completed successfully.' });
    } catch (error) {
        console.error('Error updating orders:', error);
        res.status(500).json({ message: 'Error updating orders. Please try again later.' });
    }
});


module.exports = router;
