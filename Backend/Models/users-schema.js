// const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: false },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }], //this is relation for places & user
  //& array is to represent 1 user can have multiple plcaes
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
