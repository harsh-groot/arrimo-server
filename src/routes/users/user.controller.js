const { getUsers, deleteUser, updateUser } = require("../../models/user.model");

async function httpUsers(req, res) {
  return getUsers(req, res);
}

async function httpDeleteUser(req, res) {
  const { id } = req?.body;
  const { user } = req?.params;

  deleteUser(id, user, res);
}

async function httpUpdateUser(req, res) {
  const payload = req?.body;
  if (!payload.id) {
    res.send("Missing Record ID");
  }

  updateUser(payload, res);
}

module.exports = {
  httpUsers,
  httpDeleteUser,
  httpUpdateUser,
};
