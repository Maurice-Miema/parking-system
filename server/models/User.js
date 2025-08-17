const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    nom: {type: String, require: true},
    postnom: {type: String, require: true},
    prenom: {type: String, require: true},
    fonction: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    role: {
        type: String,
        enum: ['admin', 'superadmin'],
        default: 'superadmin',
    },
}, {timestamps: true});

module.exports = mongoose.model('User', adminSchema);