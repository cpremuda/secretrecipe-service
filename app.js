/**
 *
 * Main entry point into the Benefit Assist applicaiton
 *  - start up the Restify Server
 *  - load up essential modules that are needed before anything else
 *  - set up listeners to gracefully shutdown if something horribly goes wrong in the app
 */

//===================================================
// get our AppDynamics fired up before everything else
//==================================================
//require('./config/appDynamics');

var Settings = require('./config/settings');
//var Server = require('./express_server'), // if you want to use Parse DB
var Server = require('./restify_server'),
    Constants = require('./config/constants'),
    logger = require('./logging/logger').getLogger();

//===================================================
// Start the server
//===================================================
var webserver = new Server(Settings.server.name);
var running = true;
webserver.start(process.env.PORT || Settings.server.port);


//===================================================
// Exeption handling with graceful shutdown
//===================================================

webserver.on('uncaughtException', function (req, res, route, err) {
    logger.fatal({
        url : req.url,
        method : req.method,
        msg : err.message,
        stack : err.stack
    }, "Middleware");
    res.writeHead(500);
    res.end(err.message);
    gracefulShutdown();
});


// Anything else that blows in the system that causes us to crash
process.on('uncaughtException', function (err) {
    logger.fatal('Process uncaught exception: ' + err.message);
    gracefulShutdown();
});

//listen for TERM signal, eg kill
process.on('SIGTERM', function () {
    logger.info('Closing [SIGTERM]');
    gracefulShutdown();
});

//listen for INT signal, eg Ctrl-C
process.on('SIGINT', function () {
    logger.info('Closing [SIGINT]');
    gracefulShutdown();
});


function gracefulShutdown () {

    // Just return without killing the process if we should not stop the server
    if (!running || !Settings.restartOnUncaughtException) {
        return;
    }

    // stop taking new requests.
    webserver.stop();

    var killtimer = setTimeout(function () {
        logger.info('Kill state waited ' + Settings.restartTimeout + ' ms. Exiting the process.');
        process.exit(0);
    }, Settings.restartTimeout);
    killtimer.unref();

    running = false;
}



