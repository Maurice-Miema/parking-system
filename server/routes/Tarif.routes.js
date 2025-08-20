const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth")
const { upsertTarif, getTarifs } = require("../controllers/Tarif.controller");



router.post("/addTarifandUpdate", verifyToken, upsertTarif);
router.get("/GetTarif", verifyToken, getTarifs);

module.exports = router;
