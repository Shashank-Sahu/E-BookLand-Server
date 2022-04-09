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
};



////////////////////////////////////////////////////////User Token Verification/Refresh////////////////////////////////////////////////////////
const verifyUser = (req, res) => {
    try {
        const user = jwt.verify(req.cookies.token, process.env.JWT_TOKEN);
        res.json(user);
    }
    catch { //verify refresh token then set access and refresh tokens again
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken)
            jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
                if (err)
                    res.status(401).json({ message: "User Not Authorized" });
                const { user } = decoded;
                setTokens(res, user);
                res.json({ user });
            });
        else
            res.status(401).json({ message: "User Not Authorized" });
    }
};



////////////////////////////////////////////////////////User Login////////////////////////////////////////////////////////
const loginUser = (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    User.findOne({ email: userEmail }, (err, user) => {
        if (err)
            res.status(500).json(err);
        if (bcrypt.compareSync(userPassword, user.password)) {
            setTokens(res, user);
            res.json({ user });
        }
        else
            res.status(401).json({ message: "Invalid Credentials" });
    });
};



////////////////////////////////////////////////////////User Logout////////////////////////////////////////////////////////
const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out succesfully" });
};



////////////////////////////////////////////////////////User Register////////////////////////////////////////////////////////
const registerUser = (req, res) => {
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

};

module.exports = {
    verifyUser,
    loginUser,
    logoutUser,
    registerUser
};