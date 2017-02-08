/*global module:true, require:true */
var fs = require('fs');
var merge = require('../util/objectMerge');
var _ = require('lodash');
var path = require('path');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Pull the default config file and the environment specific one
// If env specific does not exist, use the depoloyment
var defaultConfig = require('./default.json');
var envSpecificConfig;

if (fs.existsSync(path.resolve(__dirname, env + ".json"))) {
    envSpecificConfig = require('./' + env + ".json");
}
else {
    envSpecificConfig = {};
}
var settings = merge(defaultConfig, envSpecificConfig);

// merge in the app secrets
if (fs.existsSync(path.resolve(__dirname, 'secrets.json'))) {
    var secrets = require('./secrets.json');
    var defSecrets = secrets['default'];
    var envSecrets = secrets[env] || {};
    secrets = merge(defSecrets, envSecrets);
    settings = merge(settings, secrets);
}

module.exports = settings;


