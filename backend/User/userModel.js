const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    ContactNo: String,
    Email: String
})
const userModel = mongoose.model("users", UserSchema)
module.exports = userModel