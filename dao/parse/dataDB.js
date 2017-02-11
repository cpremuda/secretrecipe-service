var Constants = require('../../config/constants');
var Logger = require('../../logging/logger').getLogger();
var kaiseki = require('../../util/kaiseki');
var Settings = require('../../config/settings');
var vasync = require('vasync');
var _ = require('lodash');

var PARSE = new kaiseki(Settings.database.parse.server.appId, Settings.database.parse.server.masterKey);

var DB = {

    create : function (model, callback) {

    },

    load : function (dataId, callback) {

    },

    save : function (dataId, model, callback) {

    }
};
module.exports = DB;
