// Import server modules
const app = require('express')();
const bodyParser = require('body-parser');

// Import Database modules
const MongoClient = require('mongodb').MongoClient;

// Import configurations
const dbConfig = require('../config/database');
const serverConfig = require('../config/server');

// Import models
const index = require('../models/index');
const object = require('../models/object');

// App routing
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', index);
app.get('/object/:id*', object.get);
app.post('/object', object.post);

// Main logic: Start the application server
app.start = function() {
    // Initialise the database connection first
    MongoClient.connect(dbConfig, function (err, database) {
        if (err) {
            return console.log(err);
        }

        // Assign database connection
        db = database;

        // Start the node server after database is connected
        app.listen(serverConfig.port, function() {
            console.log('Listening on port ' + serverConfig.port);
        });
    })
}

// Module Export
module.exports = app;