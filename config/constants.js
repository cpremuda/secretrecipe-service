"use strict";

var path = require('path');
var deepFreeze = require('deep-freeze');
var projectDir = require('app-root-path').path;

var Constants = {
    projectDir : projectDir,
    applicationName : "Restify Example",
    logDir : path.resolve(projectDir, 'logs'),
    resourcesDir : path.resolve(projectDir, 'resources'),
    appId : "Example"
};
module.exports = deepFreeze(Constants);