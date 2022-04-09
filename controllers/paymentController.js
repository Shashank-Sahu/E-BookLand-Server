const express = require("express");
const router = express.Router();
const { createOrder, paymentVerification } = require("../handlers/paymentHandler");


router.post("/api/payment/createOrder", createOrder);

router.post("/api/payment/verification", paymentVerification);

module.exports = router;