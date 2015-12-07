'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser');

module.exports = function(db) {
	// Initialize express app
	var app = express();

	// for parsing application/json
	app.use(bodyParser.json()); 

	// Your own super cool function
	//app.use(require('express-bunyan-logger')());

	//serve static folder
	app.use(express.static('www'));

	// Load Routes
	require(path.resolve('./server/routes'))(app, db);

	return app;
};