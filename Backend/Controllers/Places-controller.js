const { validationResult } = require("express-validator");
const HttpError = require("../Models/http-error");
const uuid = require("uuid");
let DUMMY_PLACES = [
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
];

//getPlaceByID
const getPlaceById = (req, res, next) => {
  const userId = req.params.uid;
  const userPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  if (userPlaces.length === 0) {
    throw HttpError(
      `Couldn't able to get places with provided userid ${userId}`,
      404
    );
  }
  res.json({ userPlaces });
};

//getPlaceByUserID
const getPlaceByUserId = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);
  if (!place) {
    throw new HttpError(
      `Couldn't able to get places with provided id ${placeId}`,
      404
    );
  }
  res.json({ place: place });
};

//createPlace

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid Inputs sent", 422);
  }
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

//Update a place

const updatePlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const { title, description } = req.body;
  const updatePlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatePlace.title = title;
  updatePlace.description = description;

  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({ place: updatePlace });
};

const deletePlaceById = (req, res, next) => {
  const placeId = res.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== placeId);
  res.status(200).json({ message: "Deleted the place!" });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
