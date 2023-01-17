// Configurations for Mongo Database Connection
// ********************************************

const mongoose = require("mongoose");
require("dotenv").config();

// Initiallizing Connection String
// ******************************
const MONGO_URL = process?.env?.MONGO_URL;

// Getting Ready Databse Connection
// *******************************
mongoose.connection.once("open", () => {
  console.log("MongoDB connection is ready :>> ");
});

// Expose Error on unsuccessfull connection
// *****************************************
mongoose.connection.on("error", (err) => {
  console.log("Mongo - error :>> ", err);
});

// Connection Mongo DB
// *******************
async function mongoConnect() {
  mongoose.connect(MONGO_URL);
}

// Disconnect Mongo
// ***************
async function mongoDisConnect() {
  mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisConnect,
};
