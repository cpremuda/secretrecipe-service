var Constants = require('../../config/constants');
var Logger = require('../../logging/logger').getLogger();
var parseAPI = require('../../util/parseAPI');
var Settings = require('../../config/settings');
var _ = require('lodash');

var PARSE = new parseAPI(Settings.database.parse.server.appId, Settings.database.parse.server.masterKey);

module.exports = {

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
                return callback(_createError(body, "Login call failed"));
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
                return callback(_createError(body, "Create User call failed"));
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
    //            return callback(_createError(body, "Password reset call failed"));
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

/**
 * Utility function for figuring out the error message passed back from Parse/Kaiseki
 * @param body
 * @param defaultMsg
 * @returns {Error}
 * @private
 */
function _createError (results, defaultMsg) {

    // Try and convert to object if we can
    if (_.isString(results)) {
        try {
            results = JSON.parse(results);
        }
        catch (ex) {
        }

    }
    // Now get the the error message
    if (_.isObject(results) && results.error) {
        return new Error(results.error)
    }
    else if (results) {
        return new Error(results);
    }
    else {
        return new Error(defaultMsg);
    }

}