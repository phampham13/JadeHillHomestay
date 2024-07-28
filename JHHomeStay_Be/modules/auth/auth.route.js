const express = require("express");
const router = express.Router();
const AuthController  = require('./auth.controller');
const { authToken, authRole } = require('../../middleware');

// Các api xác thực người dùng
router.post("/login", authRole,AuthController.login);
router.post("/logout", authToken, AuthController.logout);

module.exports = router;
 