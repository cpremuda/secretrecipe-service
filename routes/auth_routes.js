var _ = require('lodash');
var AuthController = require('../dao/DAO');
var Model = require('../model/dataModel.js');
var authSchema = require('../model/schemas/authSchema.js');
var jSend = require('../util/jsend');

var AuthRoutes = {

    setup : function (server) {

        server.post('/auth/login', function (req, resp, next) {
            var authModel = new Model(req.body, authSchema);
            AuthController.login(authModel, function (error, results) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    _setSessionCookie(resp, results);
                    jSend.success(resp, results);
                }
            });
        });

        server.post('/auth/register', function (req, resp, next) {
            var authModel = new Model(req.body, authSchema);
            AuthController.createUser(authModel, function (error, results) {
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
            var authModel = new Model(req.body, authSchema);
            AuthController.requestPasswordReset(authModel, function (error, results) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    jSend.success(resp, results);
                }
            });
        });


        server.post('/auth/updatepw', function (req, resp, next) {
            var authModel = new Model(req.body, authSchema);
            var sessionToken = req.cookies.sessionToken;
            var userid = req.cookies.userId;
            AuthController.updateUser(sessionToken, userid, authModel, function (error, results) {
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
            AuthController.isLoggedIn(sessionToken, function (error, results) {
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