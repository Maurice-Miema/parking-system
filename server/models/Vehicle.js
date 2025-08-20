const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ["moto", "voiture", "bus", "camion"] },
    plaque: { type: String, required: true,},
    proprietaire: { 
        nom: { type: String, required: true },
        postnom: { type: String, required: true },
        prenom: { type: String, required: true },
        email: { type: String, required: true } 
    },
    dateEntree: { type: Date, default: Date.now },
    dateSortie: { type: Date },
    prix: { type: Number, default: 0 },
    paye: {
        type: String,
        enum: ['Pas encore', 'Payer'],
        default: 'Pas encore',
    },
    status: {
        type: String,
        enum: ['Encours', 'Sortie'],
        default: 'Encours',
    },
}, { timestamps: true });

module.exports = mongoose.model("Vehicle", VehicleSchema);
