const db = require("./dbConnection");
const bcrypt = require("bcrypt");
const adminSchema = new db.Schema({
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


adminSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});
const Admin = new db.model("Admin", adminSchema);

module.exports = { Admin };