"use strict";

var path = require('path');
var deepFreeze = require('deep-freeze');
var projectDir = require('app-root-path').path;

var Constants = {
    projectDir : projectDir,
    applicationName : "FullStack Server",
    logDir : path.resolve(projectDir, 'logs'),
    resourcesDir : path.resolve(projectDir, 'resources'),
    appId : "Example",
    dataBaseConstants: {
        recipeClass : "Recipe",
        sessionClass : "_Session",
        userClass: "_User"
    }
};

module.exports = deepFreeze(Constants);