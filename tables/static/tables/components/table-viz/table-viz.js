(function(angular) {
    'use strict';

    angular.module('table-viz', [
        'responsive-table'
    ])

    .directive('tableViz', function () {
        return {
            scope: {
                url: '@'
            },
            templateUrl: (window.STATIC_ROOT || '') + 'tables/components/table-viz/table-viz.html',
            restrict: 'E',
            controller: 'tableViz'
        };
    })

    .controller('tableViz', ['$scope', '$http', '$q', '$location', function($scope, $http, $q, $location) {

        this.query_string = function () {
            // This function is anonymous, is executed immediately and
            // the return value is assigned to QueryString!
            var query_string = {},
                query = window.location.search.substring(1),
                vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                    // If second entry with this name
                }
                else if (typeof query_string[pair[0]] === "string") {
                    query_string[pair[0]] = [query_string[pair[0]], decodeURIComponent(pair[1])];
                    // If third or later entry with this name
                }
                else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
            }
            return query_string;
        };

        this.fetch = function() {
            var deferred = $q.defer(),
                url = $scope.url + this.query_string().id + '.json';
            $http({
                url: url
            })
            .success(function (response, status, headers, config) {
                deferred.resolve(response);
            })
            .error(function (response, status, headers, config) {
                window.console.warn('WARNING: unable to get data from ' + url);
                deferred.reject(response);
            });
            return deferred.promise;
        };

        this.fetch().then(function(response){
            $scope.viz = response;
        });
        
    }]);

})(window.angular);