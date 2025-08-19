const express = require("express");
const router = express.Router();
const { upsertTarif, getTarifs } = require("../controllers/Tarif.controller");



router.post("/addTarifandUpdate", upsertTarif);
router.get("/GetTarif", getTarifs);

module.exports = router;
