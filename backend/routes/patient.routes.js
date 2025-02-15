const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { createPatient, getPatients } = require('../controllers/patient.controller');

router.post('/createPatient', authenticate, createPatient);
router.get('/getPatients', authenticate, getPatients);

module.exports = router;
