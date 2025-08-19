const Vehicle = require("../models/Vehicle");
const ParkingConfig = require("../models/ParkingConfig");
const Tarif = require("../models/Tarif");

// Enregistrer un véhicule entrant
exports.vehicleEntree = async (req, res) => {
    try {
        const { type, plaque, proprietaire } = req.body;

        // Vérifier les places disponibles
        const config = await ParkingConfig.findOne({ type });
        if (!config) return res.status(404).json({ message: "Type non trouvé" });
        if (config.placesOccupees >= config.totalPlaces) {
            return res.status(400).json({ message: "Plus de places disponibles" });
        }

        // Créer le véhicule (même plaque possible)
        const vehicle = await Vehicle.create({ type, plaque, proprietaire });

        // Incrémenter les places occupées
        config.placesOccupees += 1;
        await config.save();

        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};



// Enregistrer la sortie et calculer le prix

exports.vehicleSortie = async (req, res) => {
    try {
        const { plaque } = req.body;

        // 1. Récupérer le véhicule
        const vehicle = await Vehicle.findOne({ plaque });
        if (!vehicle) return res.status(404).json({ message: "Véhicule introuvable" });
        if (vehicle.dateSortie) return res.status(400).json({ message: "Véhicule déjà sorti" });

        // 2. Récupérer la configuration parking
        const config = await ParkingConfig.findOne({ type: vehicle.type });
        if (!config) return res.status(404).json({ message: "Configuration parking non trouvée" });

        // 3. Récupérer le tarif
        const tarif = await Tarif.findOne({ type: vehicle.type });
        if (!tarif) return res.status(404).json({ message: "Tarif non défini pour ce type de véhicule" });

        // 4. Calcul du prix
        const diffMs = new Date() - vehicle.dateEntree;
        const diffHeures = Math.ceil(diffMs / (1000 * 60 * 60));

        // Sécuriser le tarif
        const tarifHoraire = Number(tarif.prixHeure);
        if (isNaN(tarifHoraire)) {
            return res.status(500).json({ message: "Le tarifHoraire n'est pas valide (NaN)" });
        }

        vehicle.prix = tarifHoraire * diffHeures;
        vehicle.dateSortie = new Date();
        vehicle.paye = true;

        await vehicle.save();

        // 5. Mettre à jour les places occupées
        config.placesOccupees = Math.max(0, config.placesOccupees - 1);
        await config.save();

        res.status(200).json({
            message: "Sortie enregistrée avec succès",
            vehicle,
            prix: vehicle.prix
        });

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
