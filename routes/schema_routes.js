var Constants = require('../config/constants');
var jSend = require('../util/jsend');
var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');

// Cache all the schemas for easy retrieval
var schemaCache = {};
var schemaPath = path.resolve(Constants.projectDir, 'model/schemas');
var files = fs.readdirSync(schemaPath);
_.each(files, function (file) {
    schemaCache[file.split('.')[0]] = require(path.resolve(path.resolve(schemaPath, file)))
});

/**
 *
 * Define data schemas that can be used on the client as well as server
 * Create an API here for client app to request a schema
 *
 */
module.exports = {

    setup : function (server) {
        /**
         * Retrieve the requested data schema
         *
         * @params
         *      : schema - name of the schema
         *
         * return the schema JSON or {}
         */
        server.get('/schema/:schema', function (req, resp, next) {
            var name = req.params.schema;
            jSend.success(resp, schemaCache[name] || {});
        });
    }
};
