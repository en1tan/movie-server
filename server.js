const http = require("http");
const mongoose = require('mongoose');

const port = process.env.PORT || 8000;
const dbUrl = process.env.MONGOURL;
module.exports = async (app) => {
  try {
    const server = http.createServer(app);
    server.listen(port, (err) => {
      if (err) {
        console.log(`Error: ${err}`);
        process.exit(-1);
      }
      console.log(`Server running on ${port}`);
    });

    mongoose.connect(dbUrl, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then((response) => {
      if (!response) console.error("Error Connecting to DB");
      console.debug("DB Connected successully");
    });
    return server;
  } catch (err) {
    return new Error("App initialization failed");
  }
};
