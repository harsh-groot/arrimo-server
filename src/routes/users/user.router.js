const express = require("express");
const userRouter = express.Router();
const {
  httpUsers,
  httpDeleteUser,
  httpUpdateUser,
} = require("./user.controller");

userRouter.get("/", httpUsers);

// Delete API
userRouter.delete("/:user", httpDeleteUser);

// Update API
userRouter.put("/", httpUpdateUser);

module.exports = userRouter;
