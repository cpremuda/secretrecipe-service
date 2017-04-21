var jSend = require("../util/jsend");
var RecipeController = require('../controllers/recipe_controller');
var AuthController = require('../controllers/auth_controller');
var RecipeService = require('../services/recipe_service');
var pkg = require('../package.json');
var DAO = require('../dao/DAO');
var Model = require('../model/dataModel.js');
var recipeSchema = require('../model/schemas/recipeSchema');
var mod_vasync = require('vasync');

module.exports = {

    setup : function (server) {
        server.get('/recipe/:objectId', function (req, resp, next) {
            //id of recipe object in database
            var objectId = req.params.objectId;

            DAO.loadRecipe(objectId, function (error, info) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    var recipeObj = new Model(info.body, recipeSchema);
                    jSend.success(resp, recipeObj.getAll());
                }
            });
        });

        server.post('/recipe/:objectId', function (req, resp, next) {
            var recipeModel = new Model(req.body, recipeSchema);
            var objectId = req.params.objectId;
            DAO.save(objectId, recipeModel, function (error, info) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    jSend.success(resp, info);
                }
            });
        });

        server.post('/addRecipe', function (req, resp, next) {
            var recipeModel = new Model(req.body, recipeSchema);
            var sessionToken = req.cookies.sessionToken;
            RecipeController.addRecipe(recipeModel, sessionToken, function (error, info) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    jSend.success(resp, info);
                }
            })
        });

        server.post('/deleteRecipe/:objectId', function (req, resp, next) {
            var objectId = req.params.objectId;
            var sessionToken = req.cookies.sessionToken;
            RecipeController.deleteReceipe(objectId, sessionToken, function (error, info) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    jSend.success(resp, info);
                }
            })
        });

        server.get('/recipesForUser/', function (req, resp, next) {
            var sessionToken = req.cookies.sessionToken;
            RecipeController.getRecipesForCurrentUser(sessionToken, function (error, info) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    jSend.success(resp, info);
                }
            })
        });

    }
};
