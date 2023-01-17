const { Event } = require("./event.mongo");

const addEvent = async (payload) => {
  return await Event.create(payload);
};

const getEvents = async (res) => {
  Event.find({}).exec((err, events) => {
    if (events) {
      res.send(events);
    }
    if (err) {
      res.send({
        status: "error",
        msg: "Something went wrong !!",
      });
    }
  });
};

const deleteEvent = async (id, res) => {
  Event.deleteOne({ _id: id })
    .then((result) => {
      res.send(result);
    })
    .catch(function (error) {
      res.send({
        status: "error",
        msg: "Something went wrong !!",
      });
    });
};

const updateEvent = async (payload, res) => {
  Event.findOneAndUpdate(
    { _id: payload?.id },
    { event: payload?.event, date: payload?.date },
    { returnOriginal: false }
  )
    .then((result) => {
      return res.send(result);
    })
    .catch(function (error) {
      res.send({
        status: "error",
        msg: "Something went wrong !!",
      });
    });
};

module.exports = {
  addEvent,
  deleteEvent,
  getEvents,
  updateEvent,
};
