const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const { registerAdmin, loginAdmin, getMe, getallsUsers, DeleteUser, logoutAdmin } = require('../controllers/Auth.controller');

router.post('/register', verifyToken, registerAdmin);
router.post('/login', loginAdmin);
router.get("/me", verifyToken, getMe);
router.get("/getUsers", verifyToken, getallsUsers);
router.delete("/deleteUser/:id", verifyToken, DeleteUser);
router.post('/logout', logoutAdmin);

module.exports = router;
