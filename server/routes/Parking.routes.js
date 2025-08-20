const express = require("express");
const router = express.Router();
const { upsertParking, getParkingConfig } = require("../controllers/Parking.controller");
const verifyToken = require("../middlewares/auth")

// Ajouter ou modifier nombre de places
router.post("/AddTarkingAndUpdate", verifyToken, upsertParking);
router.get("/GetParking", verifyToken, getParkingConfig);

module.exports = router;
