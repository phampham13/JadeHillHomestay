const express = require("express");
const HomestayController = require("./super-admin.homestays.controller");
const router = express.Router();
const { authToken, uploadBackupFiles} = require('../../../middleware');

router.post('/create/homestays', uploadBackupFiles() ,HomestayController.createInformationForHomestay);
router.post('/getIdAdmin',HomestayController.getIdAdmin);
router.get('/homestays', authToken, HomestayController.getAllHomestays);

//Thống kê tổng doanh thu của toàn bộ homestay theo tháng trong 1 năm
router.get('/revenue/total', HomestayController.totalRevenueStatistic);
//Thống kê tổng doanh thu của 1 homestay theo từng tháng trong 1 năm
router.get('/revenue/homestay', HomestayController.revenueStatistic);

module.exports = router