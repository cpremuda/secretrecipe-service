"use strict";

var _ = require('lodash'),
    Constants = require('../config/constants'),
    DAO = require('../dao/DAO');

module.exports = {
    updatePassword : function (objectId, authModel, callback) {
        var passwordObj = {
            password : authModel.get("password")
        };

        DAO.updateUser(objectId, passwordObj, function (error, results) {
            if (error) {
                return callback(error)
            }
            else {
                return callback(null, results);
            }
        });
    },
    addRecipeForUser : function(recipeId, userID, recipeName, callback){
        var newRecipeData = {"recipeList":{"__op":"AddUnique","objects":[{"Pointer":recipeId, "Name": recipeName}]}};
        DAO.updateUser(userID, newRecipeData, callback);
    },
    deleteRecipeForUser : function(userID, recipeId, callback){
        var newRecipeData = {"recipeList":{"__op":"Remove","objects":[recipeId]}};
        DAO.updateUser(userID, newRecipeData, callback);
    }
};

