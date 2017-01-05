var PingRoutes = require("./ping_routes");
var LoggingRoutes = require("./logging_routes");
var AuthRoutes = require("./auth_routes");
var ExampleRoutes = require("./example_routes");

var Router = {
    init : function (server) {
        PingRoutes.setup(server);
        LoggingRoutes.setup(server);
        AuthRoutes.setup(server);
        ExampleRoutes.setup(server);

        /*
        ... add more routes here
         */
    }
};

module.exports = Router;