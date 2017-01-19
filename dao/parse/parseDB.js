var Constants = require('../config/constants');
var Logger = require('../logging/logger').getLogger();
var kaiseki = require('../util/kaiseki');
var Settings = require('../config/settings');
var vasync = require('vasync');
var _ = require('underscore');

var PARSE = new kaiseki(Settings.database.parse.appId, Settings.database.parse.masterKey);

var DB = {

    load : function (bookId, callback) {
        Logger.info("Loading data for book: " + bookId);
        PARSE.getObject("Book", bookId, {include : 'owner'}, function (err, res, results, success) {
            if (err) {
                Logger.error("Could not get book: " + bookId + " - " + err.message);
                return callback(err);
            }
            if (!success) {
                Logger.error("Could not get book: " + bookId + " - " + JSON.stringify(results));
                return callback(new Error(JSON.stringify(results)));
            }
            var filteredResults = _.omit(results, ["createdAt", "updatedAt", "objectId", "owner"]);
            filteredResults.email = results.owner.email;
            return callback(null, filteredResults);
        });
    },

    save : function (bookId, model, callback) {
        Logger.info("Saving data for book: " + bookId);
        PARSE.updateObject("Book", bookId, {data : model}, function (err, res, results, success) {
            if (err) {
                Logger.error("Could not update Book: " + bookId + " - " + err.message);
                return callback(err);
            }
            if (!success) {
                Logger.error("Could not update book: " + bookId + " - " + JSON.stringify(results));
                return callback(new Error(JSON.stringify(results)));
            }
            return callback(null, results);
        });
    }
};
module.exports = DB;
