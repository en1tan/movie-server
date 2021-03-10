const MovieModel = require("../models/movie.model");
const request = require("request");

require("dotenv").config();

const apiKey = process.env.APIKEY;

module.exports = {
  async saveMovie(req, res) {
    const movieDetails = await fetchMovie(req.body.name);
    if (JSON.parse(movieDetails).Response === "False") {
      res.status(404).send({
        status: false,
        message: "An error occured",
        data: movieDetails,
      });
    } else {
      const movie = JSON.parse(movieDetails);
      const movieObj = Object.assign(
        {
          title: movie.Title,
          poster: movie.Poster,
          type: movie.Type,
          plot: movie.Plot,
          genre: movie.Genre,
        },
        req.body
      );
      const newMovie = await MovieModel.create(movieObj);

      res.send({
        status: true,
        message: "Movie added",
        data: newMovie,
      });
    }
  },

  async getMovie(req, res) {
    console.log(req.body);
    const movieDetails = await fetchMovie(req.body.name);
    if (JSON.parse(movieDetails).Response === "False") {
      res.status(404).send({
        status: false,
        message: "An error occured",
        data: movieDetails,
      });
    } else {
      console.log(JSON.parse(movieDetails));
      const movie = JSON.parse(movieDetails);

      const movieData = await MovieModel.findOne({ title: movie.Title });
      res.send({
        status: true,
        message: "Movie Fetched",
        data: movieData,
      });
    }
  },
};

const fetchMovie = (text) => {
  const title = text.split(" ");
  text = title.join("+");
  const options = {
    method: "GET",
    url: `http://omdbapi.com/?apiKey=${apiKey}&t=${text}`,
  };
  return new Promise((resolve, reject) => {
    request(options, (err, response) => {
      if (response.statusCode === 200) {
        resolve(response.body);
      } else {
        reject(response.body);
      }
    });
  });
};
