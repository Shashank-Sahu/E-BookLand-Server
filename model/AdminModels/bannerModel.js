const db = require("../dbConnection");


const bannerSchema = new db.Schema({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    image: {
        type: {
            imageId: {
                type: String,
                required: true
            },
            imageName: {
                type: String,
                required: true
            },
            imageUrl: {
                type: String,
                required: true
            }
        },
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