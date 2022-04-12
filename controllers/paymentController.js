const express = require("express");
const router = express.Router();
const { createOrder, paymentVerification } = require("../handlers/paymentHandler");


router.post("/createOrder", createOrder);

router.post("/verification", paymentVerification);

module.exports = router;