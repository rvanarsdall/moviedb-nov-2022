require("dotenv").config();
const express = require("express");
const app = express();
const userController = require("./controllers/user.controller");
const movieController = require("./controllers/movie.controller");
// ! Connecting to the DB
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/moviedb");
const db = mongoose.connection;

db.once("open", () => console.log("Connected to the DB"));

app.use(express.json());

app.use("/user", userController);
app.use("/movie", movieController);
app.listen(process.env.PORT, function () {
  console.log(`movie app is listening on port ${process.env.PORT}`);
});
