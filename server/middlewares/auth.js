const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Accès refusé. Pas de token." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Vérifie combien de temps il reste avant l’expiration
        const now = Math.floor(Date.now() / 1000);
        const timeLeft = decoded.exp - now;

        // Si le token expire dans moins d'1h, on en génère un nouveau
        if (timeLeft < 3600) {
            const newToken = jwt.sign(
                { id: decoded.id, email: decoded.email },
                    process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            // On renvoie le nouveau token dans le cookie
            res.cookie("token", newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token invalide ou expiré" });
    }
};

module.exports = auth;
