const ParkingConfig = require("../models/ParkingConfig");

// Ajouter ou modifier la config des places
exports.upsertParking = async (req, res) => {
    try {
        const { type, totalPlaces } = req.body;

        if (!type || totalPlaces == null) {
        return res.status(400).json({ message: "Type et totalPlaces requis" });
        }

        const config = await ParkingConfig.findOneAndUpdate(
            { type },
            { totalPlaces },
            { new: true, upsert: true }
        );

        res.status(200).json(config);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// Lister la config actuelle (places dispo et occupées)
exports.getParkingConfig = async (req, res) => {
    try {
        const config = await ParkingConfig.find();
        res.status(200).json(config);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
