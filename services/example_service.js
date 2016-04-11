
var _ = require('lodash');

module.exports = {

    /**
     * @param appId
     * @param exampleId
     * @param callback
     * @returns {*}
     */
    execute : function (exampleId, appId, callback) {
        if (_.isUndefined(appId) || _.isUndefined(exampleId)) {
            return callback (new Error("Invalid Arguments"))
        }
        return callback(null, {
            application : appId,
            example : exampleId
        });
    }
};