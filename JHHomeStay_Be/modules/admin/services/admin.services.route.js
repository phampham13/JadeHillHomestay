const express = require("express");
const router = express.Router();
const ServicesController  = require('./admin.services.controller');

// Lấy danh sách toàn bộ Service trong bảng Service
router.get("/", ServicesController.getAllServices);
router.post("/create", ServicesController.createService);
module.exports = router;