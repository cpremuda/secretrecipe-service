"use strict";

var _ = require('lodash'),
    Constants = require('../config/constants'),
    DAO = require('../dao/DAO'),
    Logger = require('../logging/logger').getLogger(),
    mod_vasync = require('vasync'),
    AuthController = require('../controllers/auth_controller');

var RecipeController = {
    addRecipe : function (recipeModel, sessionToken, callback) {
        const recipeName = recipeModel._model.recipe.name;
        mod_vasync.parallel({'funcs': [
            function createRecipe(callback){DAO.createRecipe(recipeModel, callback)},
            function getUser(callback){DAO.getUser(sessionToken, callback)}
            ]},
            function(error, info){
                if (error) {
                    return callback(error)
                }
                else {
                    const recipeID = info.successes[0].objectId;
                    const userID = info.successes[1].objectId;
                    AuthController.addRecipeForUser(recipeID, userID, recipeName, function (error, results) {
                        return callback(error, results);
                    });
                }
        });
    },

    deleteReceipe : function (objectId, sessionToken, callback) {
        mod_vasync.waterfall([
            function getUser(callback) {
                DAO.getUser(sessionToken, function (error, info) {
                    callback(null, info);
                });
            },
            function deleteRecipeForUser(extra, callback) {
                AuthController.deleteRecipeForUser(extra.objectId, objectId, callback)
            }
        ], function(error, info){
            if (error) {
                return callback(error)
            }
            else {
                return callback(error, info);
            }
        })
    },

    getRecipesForCurrentUser : function (sessionToken, callback) {
        DAO.getUser(sessionToken, function (error, info) {
            if (error) {
                return callback(error)
            }
            else {
                var recipeObjects = info.recipeList;
                return callback(error, recipeObjects);
            }
        })
    }
};

module.exports = RecipeController;

