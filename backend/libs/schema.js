const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passport_mongoose = require('passport-local-mongoose');

const User = new Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    address: String
})

User.plugin(passport_mongoose);

module.exports = mongoose.model("User", User);