"use strict";

var Schema = require('../schema');

var AuthDef = {

    "_metaData" : {
        "name" : "Authentication Schema",
        "mutable" : false
    },

    "username" : {
        "type" : "String"
    },
    "password" : {
        "type" : "String"
    },
    "email" : {
        "type" : "String"
    },
    "phone" : {
        "type" : "String"
    }
};


module.exports = new Schema(AuthDef);



