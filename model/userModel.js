const { Schema } = require("./dbConnection");
const db = require("./dbConnection");

const userSchema = db.Schema({
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

const userDataSchema = db.Schema({
    user: {
        type: String,
        ref: 'User', //research
        required: true,
        unique: true
    },
    orders: [{
        order_id: {
            type: String,
        },
        payment_id: {
            type: String,
        },
        signature: {
            type: String,
        }
    }]
})


const User = new db.model("User", userSchema);
const UserData = new db.model("UserData", userDataSchema);

userSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    next();
});

module.exports = { User, UserData };