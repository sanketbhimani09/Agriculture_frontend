const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    message: { type: String, required: true }
});

const messageModel = mongoose.model("messages", messageSchema)
module.exports = messageModel