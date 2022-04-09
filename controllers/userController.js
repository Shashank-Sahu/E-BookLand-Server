const express = require("express");
const router = express.Router();
const { verifyUser, loginUser, logoutUser, registerUser } = require("../handlers/userHandler");




router.post("/api/user/register", registerUser);


router.post("/api/user/login", loginUser);


router.delete("/api/user/logout", logoutUser);


router.get("/api/user/verify", verifyUser);

router.get("/api/user/topUsers", (req, res) => {

});

module.exports = router;