var Constants = require('../../config/constants');
var Logger = require('../../logging/logger').getLogger();
var parseAPI = require('../../util/parseAPI').getParseAPI();
var Settings = require('../../config/settings');
var vasync = require('vasync');
var _ = require('lodash');

var DB = {

    createRecipe : function (model, callback) {
        parseAPI.createObject(Constants.dataBaseConstants.recipeClass, model.getAll(), function(err, info){
            if (err){
                return callback(err, null)
            } else {
                return callback(null, info.body);
            }
        })
    },

    loadRecipe : function (dataId, callback) {
        parseAPI.getObject(Constants.dataBaseConstants.recipeClass, dataId, null, function(err, info){
            if (err){
                return callback(err, null)
            } else {
                return callback(null, info);
            }
        })
    },

    save : function (dataId, model, callback) {
        parseAPI.updateObject(Constants.dataBaseConstants.recipeClass, dataId, model.getAll(), function(err, info){
            if (err){
                return callback(err, null)
            } else {
                return callback(null, info);
            }
        })
    }
};
module.exports = DB;
