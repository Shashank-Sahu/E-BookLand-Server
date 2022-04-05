const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

mongoose.connect("mongodb://localhost:27017/ebook");

module.exports = mongoose;


