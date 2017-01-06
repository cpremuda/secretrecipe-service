//var DAO = require('../dao/dao').getDB();
var DB = require('./parse/dataDB');
var USERS = require('./parse/userDB');
var DAO = {
    //=======================================
    //  DATA related APIs
    //=======================================
    load : function (bookId, callback) {
        return DB.load(bookId, callback);
    },

    save : function (bookId, data, callback) {
        return DB.save(bookId, data, callback);
    },

    //=======================================
    //  USER related APIs
    //=======================================
    getUsers : function (callback) {
        return USERS.getUsers(callback);
    },

    login : function (username, password, callback) {
        return USERS.login(username, password, callback);
    },

    createUser : function (username, password, callback) {
        return USERS.createUser(username, password, callback);
    },

    requestPasswordReset : function (username, callback) {
        return USERS.requestPasswordReset(username, callback);
    },

    isLoggedIn : function (sessionId, callback) {
        return USERS.isLoggedIn(sessionId, callback);
    }

};

module.exports = DAO;