const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ MongoDB connecté avec succès');
    } catch (error) {
        console.error('❌ Échec de connexion à MongoDB :', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;