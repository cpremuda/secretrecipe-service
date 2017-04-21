//var DAO = require('../dao/dao').getDB();
var DB = require('./parse/dataDB');
var USERS = require('./parse/userDB');
var DAO = {
    //=======================================
    //  DATA related APIs
    //=======================================
    loadRecipe : function (dataId, callback) {
        return DB.loadRecipe(dataId, callback);
    },

    save : function (dataId, dataModel, callback) {
        return DB.save(dataId, dataModel, callback);
    },

    createRecipe : function(dataModel, callback) {
        return DB.createRecipe(dataModel, callback);
    },

    //=======================================
    //  USER related APIs
    //=======================================
    login : function (authModel, callback) {
        return USERS.login(authModel, callback);
    },

    logout : function (ObjectId, callback) {
        return USERS.logout(ObjectId, callback);
    },

    createUser : function (authModel, callback) {
        return USERS.createUser(authModel, callback);
    },

    updateUser : function (objectId, data, callback) {
        return USERS.updateUser(objectId, data, callback);
    },

    deleteUser : function (objectId, data, callback) {
        return USERS.deleteUser(objectId, data, callback);
    },

    requestPasswordReset : function (authModel, callback) {
        return USERS.requestPasswordReset(authModel, callback);
    },

    isLoggedIn : function (sessionId, callback) {
        return USERS.isLoggedIn(sessionId, callback);
    },

    getUser : function (sessionId, callback) {
        return USERS.getUser(sessionId, callback);
    }
};

module.exports = DAO;