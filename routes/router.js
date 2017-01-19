var PingRoutes = require("./ping_routes");
var ExampleRoutes = require("./example_routes");

var Router = {
    init : function (server) {
        PingRoutes.setup(server);
        ExampleRoutes.setup(server);

        /*
        ... add more routes here
         */
    }
};

module.exports = Router;