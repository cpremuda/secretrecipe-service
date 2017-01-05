"use strict";

var express = require('express'),
// fs = require('fs'),
    path = require('path'),
    http = require('http'),
    bodyParser = require('body-parser'),
    Settings = require('./config/settings'),
    Router = require('./routes/router'),
    requestLogger = require('./middleware/request_logger'),
    cors = require('./middleware/CORS'),
    Constants = require('./config/constants'),
    ParseServer = require('parse-server').ParseServer,
    logger = require('./logging/logger').getLogger(Constants.serverName);

var parseAPI = new ParseServer(Settings.database.parse);
/**
 * Application server
 */
function ExpressServer (name) {
    if (!(this instanceof ExpressServer)) {
        return new ExpressServer();
    }

    this.server = null;
    this.name = name;
}

ExpressServer.prototype = {

    /**
     *  Start the Express server (http and https)
     */
    start : function () {
        var self = this;

        // Setup the Express app server
        this.server = express();

        this.server
            .use(Settings.database.parse.serverURL, parseAPI)
            .use(requestLogger)
            .use(cors)
            .use(require('compression')())  // Gzip response
            .use(require('cookie-parser')())        // Get easy access to cookies
            .use(bodyParser.json())
            //.use(errorLogger)
            .use(bodyParser.urlencoded({extended : false}));
            //.use(require('method-override')()); // faux http support
        //.use(express.static(path.resolve(__dirname, 'public')));

        //.use(express.favicon());
        // app.use(express.multipart());  // uncomment to support file upload

        // Setup the routes
        Router.init(this.server);

        // Start the server
        http.createServer(this.server).listen(Settings.server.port, function () {
            logger.info('Starting HTTP server ' + self.name + ' running on port ' + Settings.server.port, "Express Server");
        });

    },


    /**
     *  Stop the server
     */
    stop : function () {
        //        log.info('%s -> stopping server', this.name);
        this.server.close();
    },

    on : function (eventName, callback) {
        return this.server.on.call(this, eventName, callback);
    }
};


module.exports = ExpressServer;

