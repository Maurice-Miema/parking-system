const Tarif = require("../models/Tarif");

exports.upsertTarif = async (req, res) => {
    try {
        const { type, prixHeure } = req.body;

        if (!type || !prixHeure) {
            return res.status(400).json({ message: "Type et prixHeure requis" });
        }

        const tarif = await Tarif.findOneAndUpdate(
        { type },
            { prixHeure },
            { new: true, upsert: true }
        );

        res.status(200).json(tarif);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// Lister tous les tarifs
exports.getTarifs = async (req, res) => {
    try {
        const tarifs = await Tarif.find();
        res.status(200).json(tarifs);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
