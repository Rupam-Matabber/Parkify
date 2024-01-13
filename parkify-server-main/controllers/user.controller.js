const userService = require("../services/user.service");
const { messageCustom } = require("../utils/message");
const { OK, NOT_FOUND, BAD_REQUEST } = require("../utils/messageTypes");
const handleErrors = require("../utils/errorHandler");

const jwt = require("jsonwebtoken");

/* ------------ Configs ----------- */

// cookie options
const expiry_length = 30 * 86400;
const jwt_headers = {
  algorithm: "HS256",
  expiresIn: expiry_length,
};

const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);

    const access_token = jwt.sign(
      { email: user.email, user_id: user._id },
      String(process.env.JWT_SECRET),
      jwt_headers,
    );

    const return_object = {
      user: user,
      auth_token: access_token,
    };

    messageCustom(res, OK, "User registered successfully", return_object);
  } catch (error) {
    handleErrors(req, res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await userService.getUser({
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) {
      const err = {
        statusObj: BAD_REQUEST,
        type: "AuthenticationError",
        name: "Email or Password doesn't match.",
      };
      throw err;
    }

    const access_token = jwt.sign(
      { email: user.email, user_id: user._id },
      String(process.env.JWT_SECRET),
      jwt_headers,
    );

    const return_object = {
      user: user,
      auth_token: access_token,
    };

    messageCustom(res, OK, "User logged in successfully", return_object);
  } catch (error) {
    handleErrors(req, res, error);
  }
};

const profile = async (req, res) => {
  try {
    if (!req.body.userId) {
      throw {
        statusObj: BAD_REQUEST,
        type: "ValidationError",
        name: "Missing fields",
      };
    }
    const user = await userService.profileService(req.body.userId);
    // if (user.length == 0) {
    //   const err = {
    //     statusObj: NOT_FOUND,
    //     type: "AuthenticationError",
    //     name: "User not found.",
    //   };
    //   throw err;
    // }

    messageCustom(res, OK, "User profile", user);
  } catch (error) {
    handleErrors(req, res, error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  profile,
};
