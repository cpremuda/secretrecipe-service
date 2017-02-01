var Constants = require('../../config/constants');
var Logger = require('../../logging/logger').getLogger();
var kaiseki = require('../../util/kaiseki');
var Settings = require('../../config/settings');
var vasync = require('vasync');
var _ = require('lodash');

var PARSE = new kaiseki(Settings.database.parse.appId, Settings.database.parse.masterKey);

var DB = {

    load : function (data, callback) {

    },

    save : function (bookId, model, callback) {

    }
};
module.exports = DB;
