const db = require("./dbConnection");


const bookSchema = new db.Schema({
    title: {
        type: String,
        required: true
    },
    authors: [{
        type: String,
        required: true
    }],
    markedPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    category: {
        type: String,
        // required: true,
        lowercase: true
    },
    subCategory: {
        type: String,
        lowercase: true
    },
    type: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    publishYear: {
        type: Number,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    ISBN10: {
        type: String,
        // required: true,
    },
    ISBN13: {
        type: String,
        // required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true
    },
    breadth: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    bookSemester: {
        type: Number,
        required: true
    },
    bindingType: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
});


const Book = new db.model("Book", bookSchema);


module.exports = { Book };