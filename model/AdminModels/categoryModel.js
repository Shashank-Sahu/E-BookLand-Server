const db = require("../dbConnection");


const categorySchema = new db.Schema({
    category: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    discount: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    showOnHome: {
        type: Boolean,
        required: true
    },
});


const Category = new db.model("Category", categorySchema);


module.exports = { Category };