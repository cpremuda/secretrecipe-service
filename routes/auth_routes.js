var _ = require('lodash');
var DAO = require('../dao/DAO');
var AuthController = require('../controllers/auth_controller');
var Model = require('../model/dataModel.js');
var userSchema = require('../model/schemas/userSchema');
var jSend = require('../util/jsend');

var AuthRoutes = {

    setup : function (server) {

        server.post('/auth/login', function (req, resp, next) {
            var authModel = new Model(req.body, userSchema);
            DAO.login(authModel, function (error, results) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    _setSessionCookie(resp, results);
                    jSend.success(resp, results);
                }
            });
        });

        server.get('/auth/logout/:objectId', function (req, resp, next) {
            var objectId = req.params.objectId;
            DAO.logout(objectId, function (error, results) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    jSend.success(resp, results);
                }
            });
        });

        server.post('/auth/register', function (req, resp, next) {
            var authModel = new Model(req.body, userSchema);
            DAO.createUser(authModel, function (error, results) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    _setSessionCookie(resp, results);
                    jSend.success(resp, results);
                }
            });
        });

        server.post('/auth/forgotpw', function (req, resp, next) {
            var authModel = new Model(req.body, userSchema);
            DAO.requestPasswordReset(authModel, function (error, results) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    jSend.success(resp, results);
                }
            });
        });


        server.post('/auth/updatepw/:objectId', function (req, resp, next) {
            var objectId = req.params.objectId;
            var authModel = new Model(req.body, userSchema);
            AuthController.updatePassword(objectId, authModel, function (error, results) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    jSend.success(resp, results);
                }
            });
        });


        server.get('/auth/loggedin', function (req, resp, next) {
            var sessionToken = req.cookies.sessionToken;
            DAO.isLoggedIn(sessionToken, function (error, results) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    jSend.success(resp, results);
                }
            });
        });

        server.get('/auth/delete/:objectId', function (req, resp, next) {
            var objectId = req.params.objectId;
            DAO.deleteUser(objectId, function (error, results) {
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

module.exports = AuthRoutes;

function _setSessionCookie (resp, info) {
    resp.cookie('sessionToken', info.sessionToken, { maxAge: 900000, httpOnly: true });
    resp.cookie('userId', info.objectId, { maxAge: 900000, httpOnly: true });
}