const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

mongoose.connect("mongodb://localhost:27017/ebook");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dataId: String
});

// const userDataSchema = mongoose.Schema({

// })

userSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    next();
});

const User = new mongoose.model("User", userSchema);

module.exports = User;