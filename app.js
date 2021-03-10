const mongoose = require("mongoose");
const routes = require("./routes");
const server = require("./server");

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("tiny", { skip: () => config.env === "prod" }));
app.use(helmet());
app.use(cors());
// app.use(compression());
app.use("/", routes);
app.use((err, req, res, next) => {
  console.error("err.stack ===> ", err.stack);
  res.status(500).send({
    status: false,
    message: err.message || "An Error Occured",
    data: err.errors || null,
  });
});

server(app);
