const mongoose = require("mongoose");

const FactureSchema = new mongoose.Schema({
    vehicle: {
        type: { type: String, required: true},
        plaque:{ type: String, required: true},
    },
    proprietaire : {
        nom: {type: String, required: true},
        postnom: { type: String, required: true},
        prenom: { type: String, required: true},
        email: { type: String, required: true},
    },
    prix: {type : Number, default: 0},
    invoiceLink: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Factures", FactureSchema);
