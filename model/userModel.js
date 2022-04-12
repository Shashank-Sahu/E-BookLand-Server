const db = require("./dbConnection");
const bcrypt = require("bcrypt");
const orderObject = {
    order_id: {
        type: String,
    },
    payment_id: {
        type: String,
    },
    signature: {
        type: String,
    }
};
const userSchema = new db.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
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
    role: {
        type: String,
        required: true,
        uppercase: true
    }
});

const userDataSchema = new db.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    orders: [orderObject]
});

userSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const User = new db.model("User", userSchema);
const UserData = new db.model("UserData", userDataSchema);

module.exports = { User, UserData };