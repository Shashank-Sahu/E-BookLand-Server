const { Admin } = require("../model/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenExpiry = "600s";
const refreshTokenExpiry = "30d";


const setAdminTokens = (res, user) => {
    const token = jwt.sign({ user }, process.env.JWT_TOKEN, { expiresIn: tokenExpiry });
    const refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_TOKEN, { expiresIn: refreshTokenExpiry });
    res.cookie("adminToken", token,
        {
            expires: new Date(Date.now() + (1000 * 600)),
            httpOnly: true
        });
    res.cookie("adminRefreshToken", refreshToken,
        {
            expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
            httpOnly: true
        });
};

const loginAdmin = (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    Admin.findOne({ email: userEmail }, (err, user) => {
        if (err)
            res.status(500).json(err);
        if (bcrypt.compareSync(userPassword, user.password)) {
            setAdminTokens(res, user);
            res.json({ user });
        }
        else
            res.status(401).json(new Error("Invalid Credentials"));
    });
};

const verifyAdmin = (req, res) => {
    try {
        const user = jwt.verify(req.cookies.adminToken, process.env.JWT_TOKEN);
        res.json(user);
    }
    catch { //verify refresh token then set access and refresh tokens again
        const refreshToken = req.cookies.adminRefreshToken;
        if (refreshToken)
            jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
                if (err)
                    res.status(401).json(new Error("User Not Authorised"));
                const { user } = decoded;
                setAdminTokens(res, user);
                res.json({ user });
            });
        else
            res.status(401).json(new Error("User Not Authorised"));
    }
}

const logoutAdmin = (req, res) => {
    res.clearCookie("adminToken");
    res.clearCookie("adminRefreshToken");
    res.status(200).json({ message: "Logged out succesfully" });
};

const getAdminList = (req, res) => {
    Admin.find((err, docs) => {
        if (err)
            res.status(500).json(err);
        else
            res.json(docs);
    });
};

const addAdmin = (req, res) => {
    const userFirstName = req.body.firstName;
    const userLastName = req.body.lastName;
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const userRole = req.body.role;
    const newAdmin = new Admin({
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        password: userPassword,
        role: userRole
    });
    newAdmin.save().then((user) => {
        setAdminTokens(res, user);
        res.json({ user });
    }).catch((err) => {
        res.status(400).json(err);
    });
};

const modifyAdmin = async (req, res) => {
    const newUserFirstName = req.body.firstName;
    const newUserLastName = req.body.lastName;
    const newAdminRole = req.body.role;
    const userEmail = req.body.email;
    Admin.findOneAndUpdate(
        { email: userEmail },
        {
            firstName: newUserFirstName,
            lastName: newUserLastName,
            role: newAdminRole
        },
        { new: true },
        (err, user) => {
            if (err)
                res.status(500).json(err);
            else
                res.status(200).json({ user });
        }
    );

};

const deleteAdmin = (req, res) => {
    Admin.findOneAndDelete({ email: req.body.email }, (err, doc) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.status(200).json(doc);
        }
    });
};

const changeAdminPassword = (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const newPassword = req.body.newPassword;
    Admin.findOne({ email: userEmail }, (err, user) => {
        if (err)
            res.status(500).json(err);
        else {
            if (bcrypt.compareSync(userPassword, user.password)) {
                const newHashedPassword = bcrypt.hashSync(newPassword, 10);
                Admin.findOneAndUpdate(
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
    loginAdmin,
    verifyAdmin,
    logoutAdmin,
    getAdminList,
    addAdmin,
    modifyAdmin,
    deleteAdmin,
    changeAdminPassword
}