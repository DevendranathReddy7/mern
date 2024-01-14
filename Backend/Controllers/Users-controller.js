const HttpError = require("../Models/http-error");
const uuid = require("uuid");
const { validationResult } = require("express-validator");
const User = require("../Models/users-schema.js");

const getUsers = async (req, res, next) => {
  let users = "";
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError("cant fetch the user at the momemnt", 500);
    return next(error);
  }
  res
    .status(200)
    .json({ user: users.map((user) => user.toObject({ getters: true })) });
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("All fields are mandatory", 400));
  }
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Failed to login..please try again later", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Incorrect credentitals", 401);
    return next(error);
  }

  res.status(200).json({ message: "Login Success!" });
};

const signUpUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("All fields are mandatory", 400));
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Failed to add an account..please try again later",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "Email already taken..please user other email or try login instead sigin",
      500
    );
    return next(error);
  }
  const newUser = new User({
    name,
    email,
    image: "",
    password,
    places: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong! Could not sign you in at the moment.",
      500
    );
    return next(error);
  }
  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.loginUser = loginUser;
exports.signUpUser = signUpUser;
