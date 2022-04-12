const express = require("express");
const router = express.Router();
const { verifyUser, loginUser, logoutUser, registerUser, getUserList, modifyUser, deleteUser, changeUserPassword } = require("../handlers/userHandler");


router.post("/register", registerUser);

router.post("/login", loginUser);

router.delete("/logout", logoutUser);

router.get("/verify", verifyUser);

router.get("/list", getUserList);

router.post("/modifyUser", modifyUser);

router.delete("/deleteUser", deleteUser);

router.post("/changePassword", changeUserPassword);

router.get("/topUsers", (req, res) => {

});
module.exports = router;