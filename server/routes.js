'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app, db) {

    var controller = require('./controller')(db);

    app.get('/api/heartbeat', function(req, res) {
        res.send('heartbeat');
    });

    app.post('/api/login', function(req, res) {
        var msg = controller.login();
        res.send(msg);
    });

    app.post('/api/logout', function(req, res) {
        console.log(req.body);
        res.send('logout');
    });

    app.post('/api/register', function(req, res) {
        console.log(req.body);
        res.send('register');
    });
};