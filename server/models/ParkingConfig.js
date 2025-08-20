const mongoose = require("mongoose");

const ParkingConfigSchema = new mongoose.Schema({
    type: { type: String, required: true, unique: true, enum: ["moto", "voiture", "bus", "camion"] },
    totalPlaces: { type: Number, required: true, default: 0 },
    placesOccupees: { type: Number, required: true, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("ParkingConfig", ParkingConfigSchema);
