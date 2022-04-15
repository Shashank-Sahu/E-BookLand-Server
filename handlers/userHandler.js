const { User, UserData } = require("../model/UserModels/userModel");
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
    console.log(userPassword);
    User.findOne({ email: userEmail }, (err, user) => {
        if (err)
            res.status(500).json(err);
        if (user) {
            if (bcrypt.compareSync(userPassword, user.password)) {
                setTokens(res, user);
                res.json({ user });
            }
            else
                res.status(401).json({ message: "Invalid Credentials" });
        }
        else {
            res.status(404).json({ message: "User does not exist" });
        }
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
    const userFirstName = req.body.firstName;
    const userLastName = req.body.lastName;
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const userRole = req.body.role || "CONSUMER";
    const userIsActive = true; //TODO: Modify with a email verification
    const newUser = new User({
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        password: userPassword,
        role: userRole,
        isActive: userIsActive
    });
    newUser.save().then((user) => {
        setTokens(res, user);
        const data = new UserData({ user: user.email });
        data.save();
        res.json({ user });
    }).catch((err) => {
        res.status(400).json(err);
    });
};

////////////////////////////////////////////////////////User List////////////////////////////////////////////////////////

const getUserList = (req, res) => {
    User.find((err, docs) => {
        if (err)
            res.status(500).json(err);
        else
            res.json(docs);
    });
};

////////////////////////////////////////////////////////Modify User////////////////////////////////////////////////////////

const modifyUser = async (req, res) => {
    const newUserFirstName = req.body.firstName;
    const newUserLastName = req.body.lastName;
    const newUserRole = req.body.role || "CONSUMER";
    const userEmail = req.body.email;
    User.findOneAndUpdate(
        { email: userEmail },
        {
            firstName: newUserFirstName,
            lastName: newUserLastName,
            role: newUserRole
        },
        { new: true, runSettersOnQuery: true },
        (err, user) => {
            if (err)
                res.status(500).json(err);
            else
                res.status(200).json({ user });
        }
    );

};

////////////////////////////////////////////////////////Delete User////////////////////////////////////////////////////////

const deleteUser = (req, res) => {
    User.findOneAndDelete({ email: req.body.email }, async (err, doc) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.clearCookie("token");
            res.clearCookie("refreshToken");
            await UserData.findOneAndDelete({ user: req.body.email });
            res.status(200).json(doc);
        }
    });
};

////////////////////////////////////////////////////////Change User Password////////////////////////////////////////////////////////

const changeUserPassword = (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const newPassword = req.body.newPassword;
    User.findOne({ email: userEmail }, (err, user) => {
        if (err)
            res.status(500).json(err);
        else {
            if (bcrypt.compareSync(userPassword, user.password)) {
                const newHashedPassword = bcrypt.hashSync(newPassword, 10);
                User.findOneAndUpdate(
                    { email: userEmail },
                    { password: newHashedPassword },
                    { new: true },
                    (err, user) => {
                        if (err)
                            res.status(500).json(err);
                        else {
                            res.status(200).json({ user });
                        }
                    }
                );
            }
            else
                res.status(401).json({ message: "Invalid Credentials" });
        }
    });
};

module.exports = {
    verifyUser,
    loginUser,
    logoutUser,
    registerUser,
    changeUserPassword,
    deleteUser,
    modifyUser,
    getUserList
};