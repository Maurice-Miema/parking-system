// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// les fichier route
const Authroute = require('./routes/Auth.routes');

dotenv.config();
const app = express();

const allowedOrigins = [
    "http://localhost:5173"
];

// Middlewares
app.use(cors({
    origin: function(origin, callback) {
        // Autorise si origine est dans la liste, ou undefined (Postman, curl)
        if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        } else {
        callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
app.use('/api/auth', Authroute)

module.exports = app;