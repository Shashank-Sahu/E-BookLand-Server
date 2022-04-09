const Razorpay = require("razorpay");
const crypto = require("crypto");
const { UserData } = require("../model/userModel");
const instance = new Razorpay({ //TODO: create instance once or everytime wehn a order is placed?
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = (req, res) => {

    const options = {
        amount: req.body.amount * 100, //Paisa to Rupees
        currency: "INR",
        receipt: "receipt#1",
    };
    instance.orders.create(options, function (err, order) { //TODO: More info needed on how to save orders in MongoDB
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.json({ order });
        }
    });
};

const paymentVerification = async (req, res) => {
    const body = req.body.order_id + "|" + req.body.razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex');
    const order = {
        order_id: req.body.razorpay_order_id,
        payment_id: req.body.razorpay_payment_id,
        signature: req.body.razorpay_signature
    };
    let response = { "signatureIsValid": "false" }
    if (expectedSignature === req.body.razorpay_signature) {
        await UserData.findOneAndUpdate(
            { user: req.body.email },
            {
                $push: { orders: order }
            });
        response = { "signatureIsValid": "true" }
    }
    res.json(response);
};

module.exports = {
    createOrder,
    paymentVerification
};