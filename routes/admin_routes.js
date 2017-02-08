var adminCheck = require('../middleware/admin_check');
var jSend = require('../util/jsend');
var dao = require('../dao/DAO');
var Settings = require('../config/settings');

// Setup for the Parse/Mongo DB dashboard
var ParseDashboard = require('parse-dashboard');
var dashboard = new ParseDashboard({
    "apps": [
        Settings.database.parse
        //{
        //    "serverURL": "http://localhost:1337/parse",
        //    "appId": "myAppId",
        //    "masterKey": "myMasterKey",
        //    "appName": "MyApp"
        //}
    ]
});

var AdminRoutes = {

    setup : function (server) {

        server.get('/admin/users', adminCheck, function (req, resp, next) {
            dao.getUsers(function (error, results) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    jSend.success(resp, results);
                }
            });
        });

        /**
         * Return the current configuration file
         */
        server.get('/admin/config', adminCheck, function (req, resp, next) {
            jSend.success(resp, {'env' : process.env.NODE_ENV, 'config' : Settings});
        });

        /**
         * Return the current configuration file
         */
        server.use('/admin/dashboard', dashboard);

    }
};

module.exports = AdminRoutes;
