var ExampleController = require('../controllers/example_controller'),
    jSend = require("../util/jsend"),
    _ = require('lodash');

module.exports = {

    setup : function (server) {

        /**
         *
         * POST data is a json object that conforms to the a schema
         *  {
         *      exampleid : n - number
         *  }
         *
         * Querystring Params
         *  appid (optional)
         *      argument to determine which programs perform searches on.
         *      if passed, will use the Constants.searchFilters[referrer] to look up list of programs
         *      otherwise all programs will be searched.
         *
         * Returns :
         * {
         *      application : string
         *      example : string
         * }
         * */
        server.post('/example', function (req, resp, next) {

            var exampleId, appId = req.params.appid;

            try {
                var data = _.isObject(req.body) ? req.body : JSON.parse(req.body);
                exampleId = data.exampleId;
            }
            catch (ex) {
                return jSend.error(resp, ex);
            }

            ExampleController.executeExample(exampleId, appId, function (error, info) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    jSend.success(resp, info);
                }
            });
        });

        /**
         *
         * Querystring Params
         *      appid (optional)
         *          argument to determine which programs perform searches on.
         *          if passed, will use the Constants.searchFilters[referrer] to look up list of programs
         *          otherwise all programs will be searched.
         *
         * URL parameters
         *      exampleid: the name of the benefit to test eligibility for. (i.e. snap, liheap, etc)
         *      as defined in the benefitDef file for the state.
         *
         * Returns :
         * {
         *      application : string
         *      example : string
         * }
         */
        server.get('/example/:exampleId', function (req, resp, next) {
            var appId = req.params.appid;
            var exampleId = req.params.exampleId;

            ExampleController.executeExample(exampleId, appId, function (error, info) {
                if (error) {
                    jSend.error(resp, error);
                }
                else {
                    jSend.success(resp, info);
                }
            });
        });

    }
};

