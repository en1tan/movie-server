const http = require("http");
const port = process.env.PORT || 8000;
const dbUrl = process.env.MONGOURL;
module.exports = async (app, mongoose) => {
  try {
    const server = http.createServer(app);
    server.listen(port, (err) => {
      if (err) {
        console.log(`Error: ${err}`);
        process.exit(-1);
      }
      console.log(`Server running on ${port}`);
    });
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    return server;
  } catch (err) {
    return new Error("App initialization failed");
  }
};
