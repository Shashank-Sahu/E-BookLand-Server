const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { UserData } = require("../model/userModel");
// const 
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post("/api/payment/createOrder", (req, res) => {

    const options = {
        amount: req.body.amount * 100, //Paisa to Rupees
        currency: "INR",
        receipt: "receipt#1",
    };
    instance.orders.create(options, function (err, order) {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.json({ order });
        }
    });
});

router.post("/api/payment/verification", (req, res) => { //TODO: add response to users dataModel
    const body = req.body.order_id + "|" + req.body.razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex');
    let response = { "signatureIsValid": "false" }
    if (expectedSignature === req.body.razorpay_signature) {
        UserData.findOneAndUpdate({ user: req.body.email }, {
            "$push": {
                "orders": {
                    order_id: req.body.razorpay_order_id,
                    payment_id: req.body.razorpay_payment_id,
                    signature: req.body.razorpay_signature
                }
            }
        },
            { new: true },
            (err, data) => {
                console.log(data);
            });
        response = { "signatureIsValid": "true" }
    }
    res.send(response);
});

module.exports = router;