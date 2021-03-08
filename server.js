const http = require('http');

module.exports = async (app, mongoose) => {
    try {
        const server = http.createServer(app);
        server.listen(8000, (err) => {
            if (err) {
                console.log(`Error: ${err}`);
                process.exit(-1);
            }
            console.log(`Server running on port 8000`);
        });
        await mongoose.connect('mongodb://localhost/movieDbTest', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        return server;
    } catch (err) {
        return new Error('App initialization failed');
    }
};
