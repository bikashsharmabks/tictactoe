'use strict';

/**
 * Module dependencies.
 */

module.exports = function(db) {
    var ctrl = {};
    ctrl.db = db;

    ctrl.login = function(username, password) {
        return 'here is the login';
    }

    ctrl.logout = function(token) {
        return 'here is the logout';
    }

    ctrl.register = function(model) {
        return 'here is the register';
    }

    return ctrl;
}