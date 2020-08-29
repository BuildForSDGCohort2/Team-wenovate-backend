const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

const User = mongoose.model('User', UserSchema);
module.exports = User;