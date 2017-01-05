var kaiseki = require('../util/kaiseki');
var Settings = require('../config/settings');
var _ = require('lodash');
var merge = require('../util/objectMerge');
//var EmailService = require('../services/email_service');
var Logger = require('../logging/logger').getLogger();

var PARSE = new kaiseki(Settings.database.parse.appId);

module.exports = {
    /**
     * Log the user in
     *
     * @param username
     * @param password
     * @param callback
     *
     * @return { userinfo...., sessionToken : tttt }
     */
    login : function (username, password, callback) {
        username = username.toLowerCase();
        Logger.info ("Auth Login: " + username);

        PARSE.loginUser(username, password, function (err, res, body, success) {
            if (err) {
                return callback(err)
            }
            if (!success) {
                return callback(new Error("Login call failed"));
            }
            else {
                return callback(null, _.omit(body, ["createdAt", "updatedAt", "ACL"]));
            }

        });
    },

    /**
     * Create a new user
     *
     * @param username
     * @param password
     * @param callback
     *
     * @returns { sessionToken : tttt }
     */
    createUser : function (username, password, callback) {
        username = username.toLowerCase();

        Logger.info ("Auth Create User: " + username);
        var credentials = {
            username : username,
            password : password,
            email : username
        };
        PARSE.createUser(credentials, function (err, res, body, success) {
            if (err) {
                return callback(err)
            }
            if (!success) {
                return callback(new Error("Create User call failed"));
            }
            else {
//                EmailService.sendNewAccount(username);
                return callback(null, _.omit(body, ["createdAt", "updatedAt"]));
            }

        });
    },

    //requestPasswordReset : function (email, callback) {
    //    email = email.toLowerCase();
    //
    //    Logger.info ("Auth Request PW Reset: " + email);
    //    PARSE.requestPasswordReset(email, function(err, res, body, success) {
    //        if (err) {
    //            return callback(err)
    //        }
    //        if (!success) {
    //            return callback(new Error("Password reset call failed"));
    //        }
    //        else {
    //            return callback(null, body);
    //        }
    //    });
    //},

    isLoggedIn : function (sessionId, callback) {
        PARSE.sessionToken = sessionId;
        PARSE.getCurrentUser(function (err, res, body, success) {
            if (err) {
                return callback(err)
            }
            if (!success) {
                return callback(null, {loggedIn : false})
            }
            return callback(null, _.extend(body, {loggedIn : true}));
        });
    }
};
