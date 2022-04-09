const express = require("express");
const router = express.Router();
const { loginAdmin, verifyAdmin, logoutAdmin, getAdminList, addAdmin, modifyAdmin, deleteAdmin, changeAdminPassword } = require("../handlers/adminHandler");



//What is 'Books':int in Admin Dashboard?

router.get("/api/admin/totalEarning", (req, res) => {

});

router.get("/api/admin/totalBooksSold", (req, res) => {

});

router.get("/api/admin/totalOrdersPlaced", (req, res) => {

});

router.post("/api/admin/login", loginAdmin);

router.get("/api/admin/verify", verifyAdmin);

router.delete("/api/admin/logout", logoutAdmin);

router.get("/api/admin/list", getAdminList);

router.post("/api/admin/addAdmin", addAdmin);

router.post("/api/admin/modifyAdmin", modifyAdmin);

router.delete("/api/admin/deleteAdmin", deleteAdmin);

router.post("/api/admin/changePassword", changeAdminPassword);

module.exports = router;