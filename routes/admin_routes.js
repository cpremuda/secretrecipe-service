var adminCheck = require('../middleware/admin_check');
var jSend = require('../util/jsend');
var Settings = require('../config/settings');

// Setup for the Parse/Mongo DB dashboard
var ParseDashboard = require('parse-dashboard');
var dashboard = new ParseDashboard({
    "apps": [
        Settings.database.parse.server
    ],
    "users" : Settings.database.parse.users

}, Settings.database.parse.dashboard.allowInsecureHttp);

var AdminRoutes = {

    setup : function (server) {

        /**
         * Set up access to the DB dashboard
         */
        server.use('/admin/dashboard', dashboard);

        /**
         * Return the current env specific configuration file - careful, this will include secrets
         */
        server.get('/admin/config', adminCheck, function (req, resp, next) {
            jSend.success(resp, {'env' : process.env.NODE_ENV, 'config' : Settings});
        });

    }
};

module.exports = AdminRoutes;
