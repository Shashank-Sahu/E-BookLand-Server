const express = require("express");
const router = express.Router();
const { User, UserData } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const tokenExpiry = "600s";
const refreshTokenExpiry = "30d";
const setTokens = (res, user) => {
    const token = jwt.sign({ user }, process.env.JWT_TOKEN, { expiresIn: tokenExpiry });
    const refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_TOKEN, { expiresIn: refreshTokenExpiry });
    res.cookie("token", token,
        {
            expires: new Date(Date.now() + (1000 * 600)),
            httpOnly: true
        });
    res.cookie("refreshToken", refreshToken,
        {
            expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
            httpOnly: true
        });
}

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
        setTokens(res, user);
        const data = new UserData({ user: user.email });
        data.save();
        res.json({ user });
    }).catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });

});

////////////////////////////////////////////////////////User Login////////////////////////////////////////////////////////

router.post("/api/login", (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    User.findOne({ email: userEmail }, (err, user) => {
        if (err)
            res.status(500).json(err);
        else if (user) {
            if (bcrypt.compare(userPassword, user.password)) {
                setTokens(res, user);
                res.json({ user });
            }
        }
        else
            res.status(401).json(new Error("Invalid Credentials"));
    });
});

////////////////////////////////////////////////////////User Token Verification/Refresh////////////////////////////////////////////////////////

router.get("/api/verify", (req, res) => {
    try {
        const user = jwt.verify(req.cookies.token, process.env.JWT_TOKEN);
        res.json(user);
    }
    catch { //verify refresh token then set access and refresh tokens again
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken)
            jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
                if (err)
                    res.status(401).json(new Error("User Not Authorised"));
                const { user } = decoded;
                setTokens(res, user);
                res.json({ user });
            });
        else
            res.status(401).json(new Error("User Not Authorised"));
    }
});


module.exports = router;