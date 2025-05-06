const mongoose = require('mongoose')
const AdminSchema = new mongoose.Schema({
    Username: String,
    Password: String,
})
const adminModel = mongoose.model("admins", AdminSchema)
module.exports = adminModel