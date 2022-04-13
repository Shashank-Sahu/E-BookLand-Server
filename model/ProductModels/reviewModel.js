const db = require("../dbConnection");


const reviewSchema = new db.Schema({
    bookId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    review: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdOn: {
        type: Date,
        required: true
    }
});


const Review = new db.model("Review", reviewSchema);


module.exports = { Review };