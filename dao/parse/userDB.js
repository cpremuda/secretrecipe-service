var Constants = require('../../config/constants');
var Logger = require('../../logging/logger').getLogger();
var kaiseki = require('../../util/kaiseki');
var Settings = require('../../config/settings');
var vasync = require('vasync');
var _ = require('lodash');

var PARSE = new kaiseki(Settings.database.parse.server.appId, Settings.database.parse.server.masterKey);

var USERS = {

    getUsers : function (callback) {
        Logger.info("Getting users");
        PARSE.getUsers({limit : 1000}, function (err, res, results, success) {
            if (err) {
                Logger.error("Could not get users: " + err.message);
                return callback(err)
            }
            if (!success) {
                Logger.error("Could not get users: " + JSON.stringify(results));
                return callback(new Error(JSON.stringify(results)));
            }
            //var filteredResults = _.omit(results, ["createdAt", "updatedAt", "objectId", "owner"]);
            //filteredResults.email = results.owner.email;
            return callback(null, results);
        })
    },

    /**
     * Log the user in
     *
     * @param authModel - instance of a DataModel with authSchema
     * @param callback
     *
     * @return { userinfo...., sessionToken : tttt }
     */
    login : function (authModel, callback) {
        var username = authModel.get("username");
        var password = authModel.get("password");

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
     * @param authModel - instance of a DataModel with authSchema
     * @param callback
     *
     * @returns { sessionToken : tttt }
     */
    createUser : function (authModel, callback) {
        var username = authModel.get("username");
        var password = authModel.get("password");

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
module.exports = USERS;
