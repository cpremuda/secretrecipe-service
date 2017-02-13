"use strict";

var _ = require('lodash');
var deepFreeze = require('deep-freeze');

module.exports = function Schema (def) {
    var _def = def || {};
    _def = _.omit(_def, "_metaData");
    var _metaData = def ? def._metaData : null;
    var _mutable = def ? (def._metaData ? def._metaData.mutable : true) : true;
    var _groupId = def ? (def._metaData ? def._metaData.groupId : null) : null;

    // set the Def in stone
    deepFreeze(_def);


    this.Enum = "Enum";

    this.hasDefinition = function () {
        return this.keys().length > 0;
    };

    this.mutable = function () {
        return _mutable;
    };

    this.groupId = function () {
        return _groupId;
    };

    this.hasMetaData = function () {
        return _metaData !== null;
    };

    this.metaData = function () {
        return _metaData || {};
    };

    this.hasKey = function (key) {
        return _.has(_def, key);
    };

    this.defForKey = function (key) {
        if (this.hasKey(key)) {
            return _.cloneDeep(_def[key]);
        }
        else {
            return null;
        }
    };

    this.getAll = function () {
        return _def;
    };

    this.getOptionForKey = function (key, opt) {
        var k = this.defForKey(key);
        if (k) {
            return (_.isUndefined(k[opt])) ? null : k[opt];
        }
        return null;
    };

    this.keys = function () {
        return _.keys(_def);
    };

    this.each = function (func) {
        _.each(_def, func);
    }

};