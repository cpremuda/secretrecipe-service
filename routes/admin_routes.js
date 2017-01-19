var adminCheck = require('../middleware/admin_check');
var jSend = require('../util/jsend');
var dao = require('../dao/DAO');
var Settings = require('../config/settings');

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

    }
};

module.exports = AdminRoutes;
