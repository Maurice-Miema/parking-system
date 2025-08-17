const app = require('./index');
const dotenv = require('dotenv');
const connectDB = require('./config/DataBase');

dotenv.config();

// Connexion DB puis lancement du serveur
connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`🚀 Serveur démarré sur le port ${process.env.PORT}`);
    });
});