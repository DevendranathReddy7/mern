const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const placesRoutes = require("./Routes/Places-routes.js");
const userRoutes = require("./Routes/Users-routes.js");

app.use("/api/places", placesRoutes);
app.use("/api/places", userRoutes);

app.listen(5000);
