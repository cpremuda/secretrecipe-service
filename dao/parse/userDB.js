var Constants = require('../../config/constants');
var Logger = require('../../logging/logger').getLogger();
var parseAPI = require('../../util/parseAPI').getParseAPI();
var Settings = require('../../config/settings');
var _ = require('lodash');

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

        Logger.info ("Auth Login: " + username);

        parseAPI.loginUser(username, password, function (err, res, body, success) {
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
     *
     * Log out the user, delete session data in DB
     *
     * @param authModel
     * @param callback
     */
    logout : function (objectId, callback) {
        parseAPI.deleteObject(Constants.dataBaseConstants.sessionClass, objectId, function (err, res, body, success) {
            if (err) {
                return callback(err)
            }
            if (!success) {
                return callback(_createError(body, "Logout call failed"));
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
        var email = authModel.get("email");

        Logger.info ("Auth Create User: " + username);
        var credentials = {
            username : username,
            password : password,
            email : email
        };
        parseAPI.createUser(credentials, function (err, res, body, success) {
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

    /**
     * Update existing user info
     *
     * @param authModel
     * @param callback
     * @param objectId
     *
     * @returns { sessionToken : tttt }
     *
     */
    updateUser : function (objectId, data, callback) {

        parseAPI.updateUser(objectId, data, function (err, res, body, success) {
            if (err) {
                return callback(err)
            }
            if (!success) {
                return callback(_createError(body, "Update User call failed"));
            }
            else {
                return callback(null, _.omit(body, ["createdAt", "updatedAt"]));
            }

        });
    },

    deleteUser : function (objectId, callback) {

        parseAPI.deleteUser(objectId, function (err, res, body, success) {
            if (err) {
                return callback(err)
            }
            if (!success) {
                return callback(_createError(body, "Delete User call failed"));
            }
            else {
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
        parseAPI.sessionToken = sessionId;
        parseAPI.getCurrentUser(function (err, res, body, success) {
            if (err) {
                return callback(err)
            }
            if (!success) {
                return callback(null, {loggedIn : false})
            }
            return callback(null, _.extend(body, {loggedIn : true}));
        });
    },

    getUser : function (sessionId, callback) {
        parseAPI.sessionToken = sessionId;
        parseAPI.getCurrentUser(function (err, res, body, success) {
            if (err) {
                return callback(err)
            }
            if (!success) {
                return callback(null, body)
            }
            return callback(null, body);
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