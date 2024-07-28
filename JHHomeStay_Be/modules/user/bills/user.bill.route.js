const express = require("express");
const BillsController = require('./user.bills.controller');
const router = express.Router();

router.post('/create/bills',BillsController.createBills);

module.exports = router;