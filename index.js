'use strict';

/**
 * Module dependencies.
 */
var config = require('./config/config'),
    Datastore = require('nedb');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = {};
db.users = new Datastore(config.db.userdb);
db.games = new Datastore(config.db.gamedb);
// You need to load each database (here we do it asynchronously)
db.users.loadDatabase();
db.games.loadDatabase();

// Init the express application
var app = require('./config/express')(db);

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('Express app started on port ' + config.port);