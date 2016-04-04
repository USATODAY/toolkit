(function (angular) {
    'use strict';

    angular.module('editor', [
        'ngTouch',
        'ngRoute',
        'stepper',
        'upload',
        'edit'
    ])
    
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
        $routeProvider
            .when('/', {
                controller: 'upload',
                templateUrl: (window.STATIC_ROOT || '') + 'tables/pages/upload/upload.html',
                reloadOnSearch: false
            })
            .when('/edit/:token', {
                controller: 'edit',
                templateUrl: (window.STATIC_ROOT || '') + 'tables/pages/edit/edit.html',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: '/'
            });
    
        // configure html5 links
        $locationProvider.html5Mode(false);
    }])

    .controller('editor', ['$scope', '$location', '$route', '$routeParams', function ($scope, $location, $route, $routeParams) {
        $scope.steps = ['upload', 'edit', 'publish'];

        $scope.$on('$routeChangeStart', function(e, next, current) {
            var next_positon = $scope.steps.indexOf(next.$$route.controller);
            if (next_positon !== -1) {
                $scope.stepper_position = next_positon;
            }
        });

    }])
    
    .service('$manager', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {

        var self = this;
            

    }]);

})(window.angular);