const express = require("express");
const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Taj Mahal",
    description:
      "One of the most famous construction in the world! & it's one of the 7 wonders",
    imageUrl:
      "http://1.bp.blogspot.com/-3mUa4Z5ria0/ToRV3GwN0GI/AAAAAAAAAQ8/kA71S1kIesE/s1600/Taj+Mahal.jpg",
    address: "agra",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p1",
    title: "Tower CLock",
    description:
      "One of the most famous construction in the world! & it's one of the 7 wonders",
    imageUrl:
      "http://1.bp.blogspot.com/-3mUa4Z5ria0/ToRV3GwN0GI/AAAAAAAAAQ8/kA71S1kIesE/s1600/Taj+Mahal.jpg",
    address: "agra",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p1",
    title: "Taj Mahal",
    description:
      "One of the most famous construction in the world! & it's one of the 7 wonders",
    imageUrl:
      "http://1.bp.blogspot.com/-3mUa4Z5ria0/ToRV3GwN0GI/AAAAAAAAAQ8/kA71S1kIesE/s1600/Taj+Mahal.jpg",
    address: "agra",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
  {
    id: "p1",
    title: "Tower CLock",
    description:
      "One of the most famous construction in the world! & it's one of the 7 wonders",
    imageUrl:
      "http://1.bp.blogspot.com/-3mUa4Z5ria0/ToRV3GwN0GI/AAAAAAAAAQ8/kA71S1kIesE/s1600/Taj+Mahal.jpg",
    address: "agra",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);
  res.json({ place: place });
});

router.get("/users/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const userPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  res.json({ userPlaces });
});

module.exports = router;
