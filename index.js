require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 4000;
const userController = require("./controllers/userController")



app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

////////////////////////////////////////////////////////API Handling////////////////////////////////////////////////////////

app.use(userController);

////////////////////////////////////////////////////////Serving the Site////////////////////////////////////////////////////////

//TODO: app.get -> server up the static build of React Site

app.listen(port, () => {
    console.log(`Server started at ${port}`);
})