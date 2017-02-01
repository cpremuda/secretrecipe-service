var Settings = require('../config/settings');
var jSend = require('../util/jsend');
var pkg = require('../package.json');

module.exports = {

    setup: function (server) {
        /**
         * Enable the UI to send logging information to the server
         * This enables us to know what is going on in the browser, otherwise its a black box
         *
         * @params
         *      : type < info | warn | error >
         *
         * @post
         *      json object that contains any/all information to be logged
         */
        server.get('/config', function (req, resp, next) {
            jSend.success(resp,
                {
                    'version' : pkg.version,
                    'env' : process.env.NODE_ENV,
                    'uiConfig' : Settings.uiConfig
                });
        });
    }
};
