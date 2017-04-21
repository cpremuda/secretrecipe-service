var kaiseki = require('kaiseki');
var Settings = require('../config/settings');

module.exports = {
    getParseAPI : function (applicationId, masterKey) {
        return new kaiseki({
            applicationId : applicationId || Settings.database.parse.server.appId,
            masterKey : masterKey || Settings.database.parse.server.masterKey,
            serverUrl : "http://localhost:" + Settings.server.port,
            mountPath : Settings.database.parse.server.serverURL
        });
    }
};