(function(angular) {
    'use strict';

    angular.module('responsive-table', [
        'iframe-resizer'
    ])

    .directive('responsiveTable', function () {
        return {
            scope: {
                url: '@',
                title: '@'
            },
            templateUrl: (window.STATIC_ROOT || '') + 'tables/components/responsive-table/responsive-table.html',
            restrict: 'E',
            controller: 'responsiveTable'
        };
    })

    .controller('responsiveTable', ['$scope', '$rootScope', '$element', '$window', '$timeout', '$filter', '$manager', '$iframeResizer', function($scope, $rootScope, $element, $window, $timeout, $filter, $manager, $iframeResizer) {

        var self = this,
            w = angular.element($window);

        $scope.has_results = false;

        this.outer_height = function(el, include_border) {
            var height = el.offsetHeight,
              style = getComputedStyle(el);

            height += parseInt(style.marginTop) + parseInt(style.marginBottom);
            if (include_border) {
                height += parseInt(style.borderBottomWidth) + parseInt(style.borderTopWidth)
            }
            return height;
        };

        // shown header needs height to be set to create fixed header effect.
        // without height the table with the values won't be scrollable.
        this.set_header_height = function() {
            var set_height = function() {
                var table_values_header = $element[0].querySelector('.table-wrapper.table-values .th-row'),
                    table_headers = $element[0].querySelector('.table-wrapper.table-headers');
                if (table_values_header && table_headers) {
                    table_headers.style.height = self.outer_height(table_values_header, true) + 'px';
                }
            };
            // large data sets take a bit longer to render. Give 5 ms to re-render.
            $timeout(set_height, 5);
        };

        this.set_header_height();

        this.refresh_view = function() {
            self.set_header_height();
            $scope.has_results = $filter('filter')($scope.data.values, $scope.filter_text).length > 0;
        };

        w.bind('resize', function () {
            self.set_header_height();
        });

        $scope.$watch('filter_text', function() {
            if ($scope.data) {
                self.refresh_view();
            }
        });

        $manager.init($scope.url, false).then(function(response) {
            $scope.data = response;
            console.log($scope.data);
            self.refresh_view();
        })

    }])

    .directive('scrollToBottom', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                $timeout(function () {
                    $element[0].addEventListener('scroll', function () {
                        if (this.scrollTop + this.clientHeight === this.scrollHeight) {
                            $scope[$attrs.scrollToBottom] = true;
                            $scope.$apply();
                        }
                        else {
                            $scope[$attrs.scrollToBottom] = false;
                            $scope.$apply();
                        }
                    });
                }, 100);
            }
        };
    }])

    .service('$manager', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {

        var self = this;

        this.init = function(url, uncompress) {
            var deferred = $q.defer();
            if (!self.data) {
                self.fetch(url, uncompress).then(function (data) {
                    self.url = url;
                    self.data = data;
                    deferred.resolve(self.data);
                }, function () {
                    window.console.error('ERROR: unable to get data');
                });
            }
            else {
                deferred.resolve(self.data);
            }
            return deferred.promise;
        };

        this.uncompress_data = function(response) {
            var uncompressed_data = [];
            for (var i=0; i<response.values.length; i+=1) {
                var item = {};
                for (var j=0; j<response.fields.length; j+=1) {
                    item[response.fields[j]] = response.values[i][j];
                }
                uncompressed_data.push(item)
            }
            return uncompressed_data;
        };

        this.fetch = function(url, uncompress) {
            var deferred = $q.defer();
            $http.get(url)
                .success(function (response, status, headers, config) {
                    if (uncompress) {
                        response = self.uncompress_data(response);
                    }
                    deferred.resolve(response);
                })
                .error(function (response, status, headers, config) {
                    window.console.warn('WARNING: unable to get data from ' + url);
                    deferred.reject(response);
                });
            return deferred.promise;
        };

        this.get_data = function() {
            return this.data;
        };

        window.$manager = this;

    }]);

})(window.angular);