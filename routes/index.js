const express = require("express");
const router = express.Router();
const movieRoute = require("./movie.route");

router.post("/save", movieRoute.saveMovie);
router.get("/get", movieRoute.getMovie);

module.exports = router;
