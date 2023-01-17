const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const Event = mongoose.model("event", eventSchema);

module.exports = {
  Event,
};
