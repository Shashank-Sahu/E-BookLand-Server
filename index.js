require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 4000;
const userController = require("./controllers/userController");
const paymentController = require("./controllers/paymentController");
const adminController = require("./controllers/adminController");
const productController = require("./controllers/productController");

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

////////////////////////////////////////////////////////API Handling////////////////////////////////////////////////////////

app.use("/api/user", userController);

app.use("/api/payment", paymentController);

app.use("/api/admin", adminController);

app.use("/api/product", productController);

app.listen(process.env.PORT || port, () => {
    console.log(`Server started at ${port}`);
});