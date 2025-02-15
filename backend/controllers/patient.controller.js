const Patient = require('../models/patient.model');
const { validationResult } = require('express-validator');

exports.createPatient = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, age, gender, mobile, email } = req.body;

        const patient = new Patient({
            name,
            age,
            gender,
            mobile,
            email,
            createdBy: req.user._id
        });
        await patient.save();

        return res.status(201).json({
            success: true,
            data: patient
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getPatients = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const patients = await Patient.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: patients
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
