const db = require("../../dbConnection");


const onSaleSchema = new db.Schema({
    bookId: {
        type: db.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    }
});


const OnSale = new db.model("OnSale", onSaleSchema);


module.exports = { OnSale };