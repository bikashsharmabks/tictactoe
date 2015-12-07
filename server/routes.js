'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app, db) {
	
	app.get('/api/heartbeat',function(req, res) {
		console.log(db);
		res.send('heartbeat');
	});

	app.post('/api/login',function(req, res) {
		console.log(req.body);
		res.send('login');
	});

	app.post('/api/logout',function(req, res) {
		console.log(req.body);
		res.send('logout');
	});

	app.post('/api/register',function(req, res) {
		console.log(req.body);
		res.send('register');
	});
};
