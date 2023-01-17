const express = require("express");
const eventRouter = express.Router();

const {
  httpAddEvent,
  httpDeleteEvent,
  httpGetEvents,
  httpUpdateEvents,
} = require("./event.controller");

eventRouter.get("/", httpGetEvents);

eventRouter.post("/", httpAddEvent);

// // Delete API
eventRouter.delete("/", httpDeleteEvent);

// Update API
eventRouter.put("/", httpUpdateEvents);

module.exports = eventRouter;
