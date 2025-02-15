const express = require('express');
const connectDb = require("./config/db");
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const patientRoutes = require('./routes/patient.routes');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
connectDb();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});