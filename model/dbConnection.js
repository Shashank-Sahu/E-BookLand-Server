const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

mongoose.connect("mongodb+srv://shashank-sahu:" + process.env.DBPASS + "@anysharecluster.mzf7l.mongodb.net/ebook", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;


