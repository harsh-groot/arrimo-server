const express = require("express");
const registerUserRouter = express.Router();
const { httpRegisterUser } = require("./registration.controller");

registerUserRouter.post("/", httpRegisterUser);

module.exports = registerUserRouter;
