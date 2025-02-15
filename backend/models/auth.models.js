const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: 'string', required: true, unique: true, minLength: [5, 'Email must be at least 5 characters long'] },
    password: { type: 'string', required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
})

userSchema.methods.generateAuthToken = function () {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;