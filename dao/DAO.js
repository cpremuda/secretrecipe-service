//var DAO = require('../dao/dao').getDB();
var DB = require('./parse/dataDB');
var USERS = require('./parse/userDB');
var DAO = {
    //=======================================
    //  DATA related APIs
    //=======================================
    load : function (dataId, callback) {
        return DB.load(dataId, callback);
    },

    save : function (dataId, data, callback) {
        return DB.save(dataId, data, callback);
    },

    create : function(data, callback) {
        return DB.create(data, callback);
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