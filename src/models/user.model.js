const { User } = require("./user.mongo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenList = {};

function verifyAndSignUpUser(req, res) {
  const newUser = req?.body;

  /** Checking existing username */
  User.findOne({ username: newUser?.username }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(409).json({ message: "Failed! Username is already in use!" });
      return;
    }

    /** Checking existing email */
    User.findOne({ email: newUser?.email }).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(409).json({ message: "Failed! Email is already in use!" });
        return;
      } else {
        let encryptedPassword = await bcrypt.hash(newUser?.password, 10);

        const user = {
          ...newUser,
          email: newUser?.email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
          confirmed: true,
          blocked: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        // Creating token
        const token = jwt.sign(
          { username: newUser?.username, email: newUser?.email },
          process.env.ACCESS_TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        // Creating user in database
        const _user = await User.create(user);

        return res.status(201).json({
          jwt: token,
          user: {
            id: _user?._doc?._id,
            username: _user?._doc?.username,
            email: _user?._doc?.email,
            confirmed: _user?._doc?.confirmed,
            blocked: _user?._doc?.blocked,
            createdAt: _user?._doc?.createdAt,
            updatedAt: _user?._doc?.updatedAt,
          },
        });
      }
    });
  });
}

function verifyAndLoginUser(req, res) {
  const { identifier, password } = req.body;

  User.find({ $or: [{ username: identifier }, { email: identifier }] }).exec(
    async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user.length === 0) {
        return res.status(404).send({ message: "Identifier Not found." });
      }

      const [_user] = user;

      /**
       * Authenticating user password
       */
      const passwordIsValid = await bcrypt.compare(password, _user?.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          jwt: null,
          message: "Invalid Password!",
        });
      }

      // Creating token
      const token = jwt.sign(
        { username: _user?.username, email: _user?.email },
        process.env.ACCESS_TOKEN_KEY,
        {
          expiresIn: +process.env.JWT_EXPIRE, // 1hr
        }
      );

      // Creating refresh token
      const refreshToken = jwt.sign(
        { username: _user?.username, email: _user?.email },
        process.env.REFRESH_TOKEN_KEY,
        {
          expiresIn: +process.env.JWT_REFRESH_EXPIRE, // 24hrs
        }
      );

      const response = {
        jwt: token,
        rjwt: refreshToken,
        user: {
          id: _user?._id,
          username: _user?.username,
          email: _user?.email,
          provider: _user?.provider,
          confirmed: _user?.confirmed,
          blocked: _user?.blocked,
          createdAt: _user?.createdAt,
          updatedAt: _user?.updatedAt,
        },
      };

      tokenList[refreshToken] = response;

      return res.status(200).json(response);
    }
  );
}

function renewUserToken(req, res) {
  // refresh the token
  const data = req.body;

  // if refresh token exists
  if (data.rjwt && data.rjwt in tokenList) {
    const user = {
      username: data.username,
      email: data.email,
    };
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: +process.env.JWT_EXPIRE,
    });
    const response = {
      jwt: token,
    };
    // update the token in the list
    tokenList[data.rjwt].jwt = token;
    res.status(200).json(response);
  } else {
    res.status(404).send("Invalid request");
  }
}

const getUsers = (req, res) => {
  User.find({}).exec((err, users) => {
    if (users) {
      res.send(users);
    }
  });
};

const deleteUser = (id, user, res) => {
  User.deleteOne({ _id: id, username: user })
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

const updateUser = async (payload, res) => {
  User.findOneAndUpdate(
    { _id: payload?.id },
    { username: payload?.username, email: payload?.email },
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
  verifyAndSignUpUser,
  verifyAndLoginUser,
  renewUserToken,
  getUsers,
  deleteUser,
  updateUser,
};
