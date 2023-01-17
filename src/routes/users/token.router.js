const express = require("express");
const renewTokenRouter = express.Router();
const {httpRenewToken} = require("./token.controller");


renewTokenRouter.post("/", httpRenewToken);

module.exports = renewTokenRouter;