const express = require("express");
const { addReview, deleteReview } = require("../handlers/productHandler");

const router = express.Router();

router.post("/addReview", addReview);

router.delete("/deleteReview", deleteReview);

module.exports = router;