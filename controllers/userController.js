const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


////////////////////////////////////////////////////////User Register////////////////////////////////////////////////////////

router.post("/api/register", (req, res) => {
    const userName = req.body.username;
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const newUser = new User({
        username: userName,
        email: userEmail,
        password: userPassword
    })
    newUser.save().then((user) => {
        const token = jwt.sign({ user }, process.env.JWT_TOKEN, { expiresIn: "7d" });
        res.cookie("jwt", token,
            {
                expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)),
                httpOnly: true
            });
        res.json({ user });
    }).catch((err) => {
        res.status(400).json(err.message);
    });

});

////////////////////////////////////////////////////////User Login////////////////////////////////////////////////////////

router.post("/api/login", (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    User.findOne({ email: userEmail }, (err, user) => {
        if (err)
            console.log(err);
        else if (user) {
            if (bcrypt.compare(userPassword, user.password)) {
                const token = jwt.sign({ user }, process.env.JWT_TOKEN, { expiresIn: "7d" });
                res.cookie("jwt", token,
                    {
                        expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)),
                        httpOnly: true
                    });
                res.json({ user });
            }
        }
        else
            res.status(401).json("Invalid");
    });
});

////////////////////////////////////////////////////////User Cookie Verification////////////////////////////////////////////////////////

router.get("/api/verify", (req, res) => {
    try {
        const user = jwt.verify(req.cookies.jwt, process.env.JWT_TOKEN);
        res.json(user);
    }
    catch (err) {
        res.status(401).json({ err })
    }
});

module.exports = router;