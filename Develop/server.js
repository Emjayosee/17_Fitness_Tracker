const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT||8070;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
const mongotest = "mongodb+srv://emjayosee:password82545@cluster0.adp82.mongodb.net/workout?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGODB_URI||mongotest, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require ("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});