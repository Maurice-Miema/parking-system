const mongoose = require("mongoose");

const TarifSchema = new mongoose.Schema({
    type: { type: String, required: true, unique: true,  enum: ["moto", "voiture", "bus", "camion"] },
    prixHeure: { type: Number, required: true, default: 500 }
}, { timestamps: true });

module.exports = mongoose.model("Tarif", TarifSchema)
;
