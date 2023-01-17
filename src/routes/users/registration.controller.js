const { verifyAndSignUpUser } = require("../../models/user.model");

async function httpRegisterUser(req, res) {
  const user = req.body;

  const { username, email, password } = user;

  if (!(username && email && password)) {
    return res.status(400).json({
      error: "Missing required user properties",
    });
  }

  await verifyAndSignUpUser(req, res);

  return;
}

module.exports = {
  httpRegisterUser,
};
