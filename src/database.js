const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.on("connected", () => {
  console.log("connection to database was successful");
});

module.exports = db;
