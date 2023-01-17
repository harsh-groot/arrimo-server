const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
  },
  confirmed: {
    type: Boolean,
  },
  blocked: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = {
  User,
};
