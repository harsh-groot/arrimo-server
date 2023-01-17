const express = require("express");
const loginUserRouter = express.Router();
const { httpLoginUser } = require("./login.controller");

loginUserRouter.post("/", httpLoginUser);
module.exports = loginUserRouter;
