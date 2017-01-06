'use strict';

var Settings = require('../config/settings');
var _ = require('lodash');
var Logger = require('../logging/logger').getLogger();

/**
 * Verify that the user has authorization to make this request based upon
 * the apiKey in the Authorization header
 *
 * @param req
 * @param resp
 * @param next
 * @returns {*}
 */
var authValidator = function (req, resp, next) {
    if (Settings.server.authorizationEnabled === false) {
        return next();
    }

    // TODO - check against the referrer?

    // get the authorization header
    var apiKey = req.headers.authorization;
    if (_.has(Settings.security.apiKeys.apiKeys, apiKey)) {
        Logger.info("Authorization allowed for user: " + Settings.security.apiKeys[apiKey] + ', for route: ' + req.url);
        next();
    }
    else {
        Logger.info("Authorization failed for token: " + apiKey);
        resp.writeHead(403);
        resp.end();
    }
};

module.exports = authValidator;