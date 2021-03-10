const http = require("http");
const port = process.env.PORT || 8000;
const dbUrl = process.env.MONGOURL || 'mongodb+srv://x1k:hero@cluster0.gznkd.gcp.mongodb.net/myraba_lite_dev?retryWrites=true&w=majority';
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
    return server;
  } catch (err) {
    return new Error("App initialization failed");
  }
};
