const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const { vehicleEntree, vehicleSortie, getAllVehicles, getStats, deleteVehicle, searchByCode, SaveFactures, getAllsFactures } = require("../controllers/Vehicle.controller");


router.post("/entreeVehicule", verifyToken, vehicleEntree);
router.post("/sortieVehicule", verifyToken, vehicleSortie);
router.get("/getAllVehicles", verifyToken, getAllVehicles);
router.get("/getStats", verifyToken, getStats);
router.delete("/deleteVehicle/:id", verifyToken, deleteVehicle);
router.get("/searchByCode", verifyToken, searchByCode);
router.post('/saveinvoices', upload.single('invoiceFile'), SaveFactures);
router.get('/getAllFacture', getAllsFactures);

module.exports = router;



