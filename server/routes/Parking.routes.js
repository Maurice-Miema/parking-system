const express = require("express");
const router = express.Router();
const { upsertParking, getParkingConfig } = require("../controllers/Parking.controller");

// Ajouter ou modifier nombre de places
router.post("/AddTarkingAndUpdate", upsertParking);
router.get("/GetParking", getParkingConfig);

module.exports = router;
