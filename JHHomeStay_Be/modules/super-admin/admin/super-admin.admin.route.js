const express = require("express");
const AdminController = require("./super-admin.admin.controller");
const router = express.Router();
const { authToken } = require('../../../middleware');

router.put("/update/admins", authToken, AdminController.updateAdminById);
router.post("/create/admins", authToken, AdminController.createAdmin);
router.post("/assign-homestay", authToken, AdminController.assignAdminToHomestay);
router.post("/unassign-homestay", authToken, AdminController.unassignAdminToHomestay);
router.delete("/delete/admin/:id", authToken, AdminController.deleteAdmin);
router.delete("/delete/homestay/:id", authToken, AdminController.deleteHomestay);
router.get("/get/admins", authToken, AdminController.getAdmins);
router.get("/get/admin/:id", authToken, AdminController.getAdminById);

module.exports = router;