const express = require("express");
const path = require("path");

const registerUserRouter = require("./registration.router");
const loginUserRouter = require("./login.router");

const userRouter = require("./user.router");
const eventRouter = require("./event.router");

const api = express.Router();

api.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../index.html"));
});

api.use("/auth/local", loginUserRouter);
api.use("/auth/local/register", registerUserRouter);
api.use("/user", userRouter);
api.use("/event", eventRouter);

module.exports = api;
