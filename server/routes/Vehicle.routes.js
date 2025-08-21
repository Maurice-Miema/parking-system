const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const { vehicleEntree, vehicleSortie, getAllVehicles, getStats, deleteVehicle,searchByPlaque } = require("../controllers/Vehicle.controller");


router.post("/entreeVehicule", verifyToken, vehicleEntree);
router.post("/sortieVehicule", verifyToken, vehicleSortie);
router.get("/getAllVehicles", verifyToken, getAllVehicles);
router.get("/getStats", verifyToken, getStats);
router.delete("/deleteVehicle/:id", verifyToken, deleteVehicle);
router.get("/searchByPlaque", verifyToken, searchByPlaque);

module.exports = router;



