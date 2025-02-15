const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'], trim: true },
    age: { type: Number, required: [true, 'Age is required'], min: [0, 'Age cannot be negative'], max: [120, 'Invalid age'] },
    gender: { type: String, required: [true, 'Gender is required'], enum: ['male', 'female', 'other'] },
    mobile: { type: String, required: [true, 'Mobile number is required'], match: [/^[0-9]{10}$/, 'Invalid mobile number'] },
    email: { type: String, match: [/^\S+@\S+\.\S+$/, 'Invalid email format'], sparse: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);
