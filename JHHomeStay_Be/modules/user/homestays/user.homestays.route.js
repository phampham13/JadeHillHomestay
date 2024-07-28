
const express = require('express')
const HomestaysController = require("./user.homestays.controller");
const {uploadBackupFiles} = require("../../../middleware");
const router = express.Router();

// Chức năng đánh giá homestays
router.get("/ranking", HomestaysController.getRankingHomestays);
router.post("/rate/:id", HomestaysController.createRatingOfHomestay);


// Chức năng trả lại toàn bộ thông tin hiện có về homestays
router.get("/information/:id", HomestaysController.getHomestayById);
router.get("/filter", HomestaysController.getHomestayByFilter);

// Cập nhật homestay theo id, admin và superadmin có quyền
router.put('/update',uploadBackupFiles(), HomestaysController.updateHomestay);
module.exports = router;
