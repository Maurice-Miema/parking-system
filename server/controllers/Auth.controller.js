const Admin = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription
exports.registerAdmin = async (req, res) => {
    const { nom, postnom, prenom, fonction, email, password } = req.body;
    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).json({ message: 'Cet email est déjà utilisé.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ nom, postnom, prenom, fonction, email, password: hashedPassword });

        await admin.save();
        res.status(201).json({ message: 'Admin enregistré avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l’inscription', error: error.message });
    }
};

// Connexion
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: 'Admin introuvable' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

        const accessToken = jwt.sign(
            { id: admin._id, email: admin.email }, 
            process.env.JWT_SECRET, {
            expiresIn: '24h',
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: 'Connexion réussie'});
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
    }
};

// Route /me
exports.getMe = async (req, res) => {
    try {
        const user = await Admin.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};