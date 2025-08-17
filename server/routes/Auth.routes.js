const express = require('express');
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middlewares/auth");
const { registerAdmin, loginAdmin, getMe } = require('../controllers/Auth.controller');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get("/me", verifyToken, getMe);

module.exports = router;
