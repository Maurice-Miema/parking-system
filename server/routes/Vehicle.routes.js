const express = require("express");
const router = express.Router();
const { vehicleEntree, vehicleSortie } = require("../controllers/Vehicle.controller");


router.post("/entreeVehicule", vehicleEntree);
router.post("/sortieVehicule", vehicleSortie);

module.exports = router;


