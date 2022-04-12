const db = require("./dbConnection");


const promoCodeSchema = new db.Schema({
    code: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    category: [{
        type: String,
        required: true,
        lowercase: true
    }]
});


const PromoCode = new db.model("PromoCode", promoCodeSchema);


module.exports = { PromoCode };