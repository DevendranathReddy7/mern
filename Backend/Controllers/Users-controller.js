const HttpError = require("../Models/http-error");
const uuid = require("uuid");
const { validationResult } = require("express-validator");

let USERS = [
  {
    id: "u1",
    name: "Dev",
    email: "test1@email.com",
    password: "testing",
  },
  {
    id: "u2",
    name: "Devendra Reddy",
    email: "test2@email.com",
    password: "testing",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ user: USERS });
};

const loginUser = (req, res, next) => {
  const errors = validationResult();
  if (!errors.isEmpty()) {
    throw new HttpError("All fields are mandatory", 400);
  }
  const { email, password } = req.body;
  const identifiedUser = USERS.find((user) => user.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Incorrect credentitals", 401);
  }

  res.status(200).json({ message: "Login Success!" });
};

const signUpUser = (req, res, next) => {
  const errors = validationResult();
  if (!errors.isEmpty()) {
    throw new HttpError("All fields are mandatory", 400);
  }
  const { name, email, password } = req.body;

  const hasUsers = USERS.find((u) => u.email === email);
  if (hasUsers) {
    throw new HttpError("Email already taken", 422);
  }
  const newUser = {
    id: uuid(),
    name,
    email,
    password,
  };
  USERS.push(newUser);

  res.status(201).json({ user: newUser });
};

exports.getUsers = getUsers;
exports.loginUser = loginUser;
exports.signUpUser = signUpUser;
