const serviceUser = require("../service/user");
const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt');

const JWT_SECRET =
  "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * for registering the user
 */
async function registerCustomer(req, res) {
  const { username, email, password } = req.body;

  if (!username || typeof username !== "string") {
    return res.status(400).json({
      message: "Invalid username",
    });
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      message: "Invalid email",
    });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  console.log(req.body);
  try {
    let data = await serviceUser.registerCustomer(req.body);
    res.status(200).json(data);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "email already in use",
      });
    }
  }
}

async function registerOrganizer(req, res) {
  const { username, email, password } = req.body;

  if (!username || typeof username !== "string") {
    return res.status(400).json({
      message: "Invalid username",
    });
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      message: "Invalid email",
    });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  console.log(req.body);
  try {
    let data = await serviceUser.registerOrganizer(req.body);
    res.status(200).json(data);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "email already in use",
      });
    }
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 * for login
 */
async function login(req, res) {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await serviceUser.login(email);

  if (!email) {
    return res.status(400).json({
      message: "email invalid or not registered",
    });
  }

  try {
    if (password == user.password) {
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          user_type: user.user_type,
        },
        JWT_SECRET
      );
      return res.status(200).json({
        user,
        data: token,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "email/password is invalid",
    });
  }
}

async function updateOrganizer(req, res) {
  let data = await serviceUser.updateOrganizer(req.body);

  if (!data)
    return res.status(400).json({
      message: "data not found",
    });

  return res.status(200).json(data);
}

module.exports = {
  registerCustomer,
  registerOrganizer,
  login,
  updateOrganizer,
};
