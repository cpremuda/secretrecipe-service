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

    login : function (authModel, callback) {
        return USERS.login(authModel, callback);
    },

    createUser : function (authModel, callback) {
        return USERS.createUser(authModel, callback);
    },

    requestPasswordReset : function (authModel, callback) {
        return USERS.requestPasswordReset(authModel, callback);
    },

    isLoggedIn : function (sessionId, callback) {
        return USERS.isLoggedIn(sessionId, callback);
    }

};

module.exports = DAO;