const { validationResult } = require("express-validator");
const HttpError = require("../Models/http-error");
const uuid = require("uuid");
const Place = require("../Models/place-schema");
const User = require("../Models/users-schema");

const getCoordsForAddress = require("../utils/location");
const mongoose = require("mongoose");

//getPlaceByID
const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let userPlaces = "";
  try {
    userPlaces = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong! Could not find a place by Id",
      500
    );
    return next(error);
  }
  if (!userPlaces) {
    const error = new HttpError(
      "Something went wrong! Could not find a place by Id",
      500
    );
    console.log(error);
    return next(error);
  }
  res.json({ userPlaces: userPlaces.toObject({ getters: true }) });
};

//getPlaceByUserID
const getPlaceByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userPlaces = "";
  try {
    userPlaces = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Failed to fetch the places for your userId, please try again later",
      500
    );
    return next(error);
  }
  if (!userPlaces) {
    const error = new HttpError(
      "Failed to fetch the places for your userId, please try again later",
      500
    );
    return next(error);
  }
  res.json({
    userPlaces: userPlaces.map((place) => place.toObject({ getters: true })),
  });
};

//createPlace

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs sent", 422));
  }
  const { title, description, address, creator } = req.body;
  // let coordinates;
  // try {
  //   coordinates = await getCoordsForAddress(address);
  // } catch (error) {
  //   return next(error);
  // }
  const createdPlace = new Place({
    title,
    description,
    address,
    //location: coordinates,
    image:
      "http://1.bp.blogspot.com/-3mUa4Z5ria0/ToRV3GwN0GI/AAAAAAAAAQ8/kA71S1kIesE/s1600/Taj+Mahal.jpg",
    creator,
  });

  let user = "";
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError("Failed to add a place, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 400);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Failed to add a place, please try again", 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

//Update a place

const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs sent", 422));
  }
  const placeId = req.params.pid;
  const { title, description } = req.body;

  let userPlace = "";
  try {
    userPlace = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong! Could not update the place.",
      500
    );
    return next(error);
  }
  userPlace.title = title;
  userPlace.description = description;

  try {
    await userPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong! Could not update the place.",
      500
    );
    return next(error);
  }
  res.status(200).json({ place: userPlace.toObject({ getters: true }) });
};

const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let userPlace = "";
  try {
    userPlace = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong! Could not able to delete the place.",
      500
    );
    return next(error);
  }

  if (!userPlace) {
    const error = new HttpError(
      "could not find the place for the provided id",
      400
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await userPlace.deleteOne({ session: sess });
    userPlace.creator.places.pull(userPlace); //removes the placefrom db
    await userPlace.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong! Could not able to delete the place.",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Deleted the place!" });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
