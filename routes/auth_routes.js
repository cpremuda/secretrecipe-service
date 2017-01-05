var _ = require('lodash');
var AuthController = require('../controllers/auth_controller');
var jSend = require('../util/jsend');

var AuthRoutes = {

    setup : function (server) {

        server.post('/auth/login', function (req, resp, next) {
            var data = _.isObject(req.body) ? req.body : JSON.parse(req.body);
            var username = data.username;
            var pw = data.password;
            AuthController.login(username, pw, function (error, results) {
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
            var data = _.isObject(req.body) ? req.body : JSON.parse(req.body);
            var username = data.username;
            var pw = data.password;
            AuthController.createUser(username, pw, function (error, results) {
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
            var data = _.isObject(req.body) ? req.body : JSON.parse(req.body);
            var email = data.email;
            AuthController.requestPasswordReset(email, function (error, results) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    jSend.success(resp, results);
                }
            });
        });


        server.post('/auth/updatepw', function (req, resp, next) {
            var data = _.isObject(req.body) ? req.body : JSON.parse(req.body);
            var sessionToken = req.cookies.sessionToken;
            var userid = req.cookies.userId;
            AuthController.updateUser(sessionToken, userid, {password : data.password}, function (error, results) {
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
    resp.cookie('userId', info.objectId), { maxAge: 900000, httpOnly: true };
}