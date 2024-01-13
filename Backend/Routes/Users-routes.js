const express = require("express");
const router = express.Router();

const USERS = [
  {
    id: "u1",
    name: "Dev",
    image:
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    places: 3,
  },
  {
    id: "u2",
    name: "Devendra Reddy",
    image:
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    places: 2,
  },
];
router.get("/users/:uid", (req, res, next) => {
  res.json({ user: "I am user" });
});

module.exports = router;
