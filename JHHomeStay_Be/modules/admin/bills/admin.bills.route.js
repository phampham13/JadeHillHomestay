
const express = require("express");
const BillsController = require("./admin.bills.controller");
const router = express.Router();
const { authToken } = require('../../../middleware');

// Chức năng trả lại danh sách các bills của admin
router.get("/bills-of-admin/:id",authToken, BillsController.getBillsByAdminId);
router.put("/update/bills", BillsController.updateBillsById)
router.get("/bills-of-homestay",authToken, BillsController.getBillsByHomestayId);
router.delete("/delete/bills/:id", authToken, BillsController.deleteBillsById);

module.exports = router;