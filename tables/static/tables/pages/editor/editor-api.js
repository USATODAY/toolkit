(function (angular) {
    'use strict';

    angular.module('editor-api', [
    ])
    
    .service('$api', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {

        var self = this;

        this.get_table_viz = function(params) {
            return self.fetch(window.options.table_viz.url, params);
        };

        this.set_table_viz = function(params) {
            return self.fetch(window.options.table_viz.url, params, {
                method: 'POST'
            });
        };

        this.fetch = function(url, params, options) {
            var deferred = $q.defer(),
                http_config = {
                    method: options.method || 'GET',
                    url: url,
                    // set csrf header
                    headers: {
                        'X-CSRFToken':  window.options.csrf_token
                    }
                };
            // no params
            if (!params) {
                params = {};
            }
            // post/put uses data
            if (http_config.method === 'GET') {
                http_config.params = params;
            }
            // get uses url params
            else {
                http_config.data = params;
            }
            $http(http_config)
                .success(function (response, status, headers, config) {
                    deferred.resolve(response);
                })
                .error(function (response, status, headers, config) {
                    window.console.warn('WARNING: failed api call at ' + url);
                    deferred.reject(response);
                });
            return deferred.promise;
        };
            

    }]);

})(window.angular);