const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const placesRoutes = require("./Routes/Places-routes.js");
const userRoutes = require("./Routes/Users-routes.js");
const HttpError = require("./Models/http-error.js");

app.use(bodyParser.json());
app.use("/api/places", placesRoutes);

app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  throw new HttpError("Could not find the route", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

app.listen(5000);
