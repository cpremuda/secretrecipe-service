//-------------
// Utility function to deep merge into target obj where source takes precedence
// returns updated tarqet object
var _ = require('lodash');
module.exports = function mergeObjects (target, source, dontMergeArrays) {
    var newObj = _.cloneDeep(target);

    _.each(source, function (p, idx) {

        try {
            // Property in destination object set; update its value.

            if (_.isObject(p) && !_.isArray(p) && !_.isFunction(p) && !_.isRegExp(p)) {
                newObj[idx] = mergeObjects(newObj[idx], p, dontMergeArrays);
            }
            else if (!dontMergeArrays && _.isArray(p) && _.isArray(newObj[idx])) {
                newObj[idx] = _.union(p, newObj[idx])
            }
            else {
                newObj[idx] = p;
            }
        }
        catch (e) { // Property in target object not set; create it and set its value.
            newObj[idx] = p;
        }
    });

    return newObj;

};