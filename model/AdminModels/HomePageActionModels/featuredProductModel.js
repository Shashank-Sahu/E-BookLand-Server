const db = require("../../dbConnection");


const featuredProductSchema = new db.Schema({
    bookId: {
        type: db.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    }
});


const FeaturedProduct = new db.model("FeaturedProduct", featuredProductSchema);


module.exports = { FeaturedProduct };