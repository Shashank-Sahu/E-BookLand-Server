require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 4000;
const userController = require("./controllers/userController");
const paymentController = require("./controllers/paymentController");

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

////////////////////////////////////////////////////////API Handling////////////////////////////////////////////////////////

app.use(userController);

app.use(paymentController);


app.listen(port, () => {
    console.log(`Server started at ${port}`);
});