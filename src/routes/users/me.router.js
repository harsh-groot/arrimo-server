const express = require("express");
const meRouter = express.Router();
const {httpMeUser} = require("./me.controller");


meRouter.post("/", httpMeUser);
module.exports = meRouter;