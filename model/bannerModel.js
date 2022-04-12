const db = require("./dbConnection");


const bannerSchema = new db.Schema({
    title: {
        type: String
    },
    subTitle: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    navigateTo: {
        type: String,
        required: true
    },
    book: {
        type: String,
        required: true
    }
});


const Banner = new db.model("Banner", bannerSchema);


module.exports = { Banner };