const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["series", "movie"],
    required: true,
  },
  genre: {
    type: String,
  },
}, { timestamps: true });

const Movies = model("Movies", movieSchema);
Movies.createCollection();
module.exports = Movies;
