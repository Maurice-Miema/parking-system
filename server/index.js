// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// les fichier route
const Authroute = require('./routes/Auth.routes');
const TarifRoutes = require("./routes/Tarif.routes");
const ParkingRoutes = require("./routes/Parking.routes");
const VehicleRoutes = require("./routes/Vehicle.routes");

dotenv.config();
const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://maugus-parking.vercel.app'
];

// Middlewares
app.use(cors({
    origin: function(origin, callback) {
        // Autorise si origine dans la liste ou requête directe (Postman, curl)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
app.use('/api/auth', Authroute);
app.use("/api/tarifs", TarifRoutes);
app.use("/api/parking", ParkingRoutes);
app.use("/api/vehicle", VehicleRoutes);

module.exports = app;
