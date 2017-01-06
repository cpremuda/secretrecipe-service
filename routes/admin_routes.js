var adminCheck = require('../middleware/admin_check');
var jSend = require('../util/jsend');
var dao = require('../dao/DAO');

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


    }
};

module.exports = AdminRoutes;
