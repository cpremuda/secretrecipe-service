var PingRoutes = require("./ping_routes");
var LoggingRoutes = require("./logging_routes");
var AuthRoutes = require("./auth_routes");
var AdminRoutes = require("./admin_routes");
var ConfigRoutes = require("./config_routes");
var SchemaRoutes = require("./schema_routes");
var RecipeRoutes = require("./recipe_routes");

var Router = {
    init : function (server) {
        PingRoutes.setup(server);
        LoggingRoutes.setup(server);
        AuthRoutes.setup(server);
        AdminRoutes.setup(server);
        ConfigRoutes.setup(server);
        SchemaRoutes.setup(server);
        RecipeRoutes.setup(server);

        /*
        ... add more routes here
         */
    }
};

module.exports = Router;