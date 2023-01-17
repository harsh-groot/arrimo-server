const {
  addEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} = require("../../models/event.model");

async function httpAddEvent(req, res) {
  const { event, date } = req.body;
  if (!(event && date)) {
    res.send("Missing required fields such as event name or date");
  }
  addEvent(req.body).then((result) => {
    res.send(result);
  });
}

async function httpGetEvents(req, res) {
  getEvents(res);
}

async function httpUpdateEvents(req, res) {
  const { event, date, id } = req.body;

  if (!id) {
    res.send("Missing required field");
  }

  if (event || date) {
    updateEvent(req.body, res);
  } else {
    res.send("Missing required field such as event name or date");
  }
}

async function httpDeleteEvent(req, res) {
  const { id } = req.body;
  if (!id) {
    res.send("Missing required fields such as event id");
  }
  deleteEvent(id, res);
}

module.exports = {
  httpAddEvent,
  httpDeleteEvent,
  httpGetEvents,
  httpUpdateEvents,
};
