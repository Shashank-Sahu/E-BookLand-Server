const db = require("../../dbConnection");


const bestSellerSchema = new db.Schema({
    bookId: {
        type: db.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    }
});


const BestSeller = new db.model("BestSeller", bestSellerSchema);


module.exports = { BestSeller };