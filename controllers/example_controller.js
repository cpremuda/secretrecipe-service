"use strict";

var _ = require('lodash'),
    Constants = require('../config/constants'),
    ExampleService = require('../services/example_service'),
    Logger = require('../logging/logger').getLogger();

module.exports = {

    executeExample : function (exampleId, appId, callback) {
        // set a default app id if one was not passed in
        appId = appId || Constants.appId;

        if (_.isUndefined(exampleId)) {
            var err = new Error("Missing example ID");
            Logger.error(err);
            return callback(err);
        }


        // now call our service to make any remote calls
        ExampleService.execute(exampleId, appId, function (err, info) {
            if (err) {
                Logger.error(err);
            }
            return callback(err, info);
        })
    }
};

