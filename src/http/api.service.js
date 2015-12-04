// http wrapper that allows a platform to define a base api path for services
angular
.module(
    'lib.http.api.service',
    []
)
.provider(
    'Api',
    function() {
        'use strict';

        var apiPath = '',
            pathIsSet = false;

        // this can only be configured once, to prevent accidental overrides
        this.setApiPath = function(path) {
            if (pathIsSet) {
                throw new Error('Api: error defining apiPath: ' + path + ' apiPath already defined! ' + apiPath);
            }

            if (!angular.isString(path)) {
                throw new Error('Api: invalid apiPrefix!');
            }

            apiPath = path;
            pathIsSet = true;
        };

        this.$get = [
            '$http',
            function($http) {
                var wrapper = function(config) {
                    if (config.url) {
                        config.url = apiPath + config.url;
                    }

                    return $http(config);
                };

                var methods = ['get', 'head', 'post', 'put', 'delete', 'jsonp', 'patch'],
                    i = 0,
                    setPath = function(method) {
                        wrapper[method] = function(url) {
                            var args = Array.prototype.slice.call(arguments, 1);

                            url = apiPath + url;

                            args.unshift(url);

                            return $http[method].apply(this, args);
                        };
                    };

                for (i = 0; i < methods.length; i++) {
                    setPath(methods[i]);
                }

                return wrapper;
            }
        ];
    }
);
