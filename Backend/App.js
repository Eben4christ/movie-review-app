const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/error")
const cors = require("cors")
require("dotenv").config();
require("./db");
const userRouter = require('./routes/user');
const { handleNotFound } = require("./utils/helper");


const app = express();
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/user", userRouter)

app.use("/*", handleNotFound)


app.use(errorHandler)

app.listen(8000, () => {
    console.log("Port is listening on port 8000");
});