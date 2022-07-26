require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.mongo_pass}@cluster0.thrkg.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to mongo");
  })
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
