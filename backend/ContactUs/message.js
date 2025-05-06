const express = require('express');
const router = express.Router();
const messageModel = require('./messageModel');

// Get all messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await messageModel.find();
        if (messages.length > 0) {
            res.json(messages);
        } else {
            res.status(404).json({ message: 'No messages found.' });
        }
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});

// Add new message
router.post('/add-message', async (req, res) => {
    const { fullName, email, message } = req.body;

    if (!fullName || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const newMessage = new messageModel({
            fullName,
            email,
            message
        });

        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ message: 'Error saving message. Please try again later.' });
    }
});


// Delete a message by ID
router.delete('/delete-message/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMessage = await messageModel.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found.' });
        }

        res.status(200).json({ message: 'Message deleted successfully.' });
    } catch (err) {
        console.error('Error deleting message:', err);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});

module.exports = router;
