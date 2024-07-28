const express = require("express");
const DiscountsController  = require("./admin.discounts.controller");
const router = express.Router();
const {authToken} = require('../../../middleware');

router.post("/discounts/create", DiscountsController.CreateDiscount);
router.delete("/discounts/delete/:id", DiscountsController.DeleteDiscount);
router.get("/discounts/:id", DiscountsController.FindDiscountById);
router.put("/discounts/update/:id", DiscountsController.UpdateDiscount);
router.get("/discounts", DiscountsController.GetAllDiscounts);


module.exports = router;
