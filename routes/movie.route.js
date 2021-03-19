const MovieModel = require("../models/movie.model");
const request = require("request");
const axios = require("axios").default;
const _ = require("lodash");

require("dotenv").config();

const apiKey = process.env.IMDBAPIKEY;
let type = "Search";
const apiUrl =
  "https://movie-database-imdb-alternative.p.rapidapi.com/";

module.exports = {
  async saveMovie(req, res) {
    try {
      const movieDetails = (await fetchMovie(req.body.name)).data;
      const movie = movieDetails.Search[0];
      const newMovie = new MovieModel({
        title: movie.Title,
        poster: movie.Poster,
        link: req.body.link,
        type: movie.Type,
        year: movie.Year,
        imdbId: movie.imdbID,
      });
      newMovie.save();
      res.send({
        status: true,
        message: "Movie added",
        data: newMovie,
      });
    } catch (err) {
      res.status(404).send({
        statuss: false,
        message: err.Message || "An error occured",
        data: err || null,
      });
    }
  },

  async getMovie(req, res) {
    const searchString = req.query.name;
    const movieData = await MovieModel.findOne({
      title: { $regex: searchString, $options: "i" },
    });
    if (!movieData)
      res.status(404).send({
        status: false,
        message: "Movie not found",
        data: null,
      });
    else
      res.send({
        status: true,
        message: "Movie Fetched",
        data: _.pick(movieData, [
          "title",
          "poster",
          "link",
          "genre",
          "type",
          "plot",
        ]),
      });
  },

  async showAllMovies(req, res) {
    let limit = req.query.page_size || 50;
    limit = parseInt(limit);
    let skip = (parseInt(req.query.page_number) - 1) * limit;
    const movies = await MovieModel.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
    res.send({
      status: true,
      message: "All movies fetched",
      data: movies,
    });
  },

  async deleteMovie(req, res) {
    try {
      await MovieModel.findByIdAndDelete(req.params.id);
      res.send({
        status: true,
        message: "Movie deleted",
        data: null,
      });
    } catch (err) {
      res.status(400).send({
        status: false,
        message: "Error occured",
        data: err,
      });
    }
  },
};

const fetchMovie = async (text) => {
  return axios.get(apiUrl, {
    params: { s: text, r: "json" },
    headers: {
      "x-rapidapi-key":
        "b7afc405d0msh9e4804e8cbcd3cap186bccjsne6754a28bfc9",
      "x-rapidapi-host":
        "movie-database-imdb-alternative.p.rapidapi.com",
    },
  });
};
