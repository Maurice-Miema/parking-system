const Vehicle = require("../models/Vehicle");
const ParkingConfig = require("../models/ParkingConfig");
const Tarif = require("../models/Tarif");
const generateVehicleCode = require("../utils/generateCode");
const Facture = require("../models/Facture");

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

        // ✅ Génération d’un code unique
        let code;
        let exists;
        do {
            code = generateVehicleCode();
            exists = await Vehicle.findOne({ code });
        } while (exists);

        // Créer le véhicule (même plaque possible)
        const vehicle = await Vehicle.create({ code, type, plaque, proprietaire });

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
        vehicle.paye = "Payer";
        vehicle.status = "Sortie";

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

// Lister tous les véhicules
exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().sort({ dateEntree: -1 });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// Statistiques des véhicules
exports.getStats = async (req, res) => {
    try {
        const total = await Vehicle.countDocuments();
        const enCours = await Vehicle.countDocuments({ status: "Encours" });
        const sortie = await Vehicle.countDocuments({ status: "Sortie" });

        // Nombre total par type
        const parType = await Vehicle.aggregate([
            { $group: { _id: "$type", total: { $sum: 1 } } }
        ]);

        // Nombre par type + status
        const parTypeEtStatus = await Vehicle.aggregate([
            { $group: { _id: { type: "$type", status: "$status" }, total: { $sum: 1 } } }
        ]);

        res.status(200).json({
            total,
            enCours,
            sortie,
            parType,
            parTypeEtStatus
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// Supprimer un véhicule
exports.deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await Vehicle.findByIdAndDelete(id);
        if (!vehicle) return res.status(404).json({ message: "Véhicule introuvable" });
        res.status(200).json({ message: "Véhicule supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// Recherche par plaque
exports.searchByCode = async (req, res) => {
    try {
        const { code } = req.params;

        // Regex insensible à la casse (i)
        const vehicles = await Vehicle.find({ code: { $regex: code, $options: "i" } }).sort({ dateEntree: -1 });

        if (!vehicles || vehicles.length === 0) {
            return res.status(404).json({ message: "Aucun véhicule trouvé" });
        }

        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};


// enregistrer facture
exports.SaveFactures = async (req, res) => {
    try {
        const { vehicle, proprietaire, prix  } = req.body;
        const file = req.file;

        if (!vehicle || !proprietaire || !prix || !file) {
            return res.status(400).json({ message: "Missing vehicle or invoice file" });
        }

        const newInvoice = new Facture({ vehicle, proprietaire, prix, invoiceLink: `/uploads/${file.filename}`});

        await newInvoice.save();
        res.status(201).json({ message: "Invoice saved successfully!", invoice: newInvoice });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
}

// recuper toutes les factures
exports.getAllsFactures = async (req, res) => {
    try {
        const invoice = await Facture.find();
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message : "Erreur Serveur", error: error.message});
    }
}