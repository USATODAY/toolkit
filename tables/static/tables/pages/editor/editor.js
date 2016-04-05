(function (angular) {
    'use strict';

    angular.module('editor', [
        'ngTouch',
        'ngRoute',
        'stepper',
        'upload',
        'edit',
        'publish'
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
            .when('/publish/:token', {
                controller: 'edit',
                templateUrl: (window.STATIC_ROOT || '') + 'tables/pages/publish/publish.html',
                reloadOnSearch: false
            })
            .when('/publish/:token', {
                controller: 'publish',
                templateUrl: (window.STATIC_ROOT || '') + 'tables/pages/publish/publish.html',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: '/'
            });
    
        // configure html5 links
        $locationProvider.html5Mode(true);
    }])

    .controller('editor', ['$scope', function ($scope) {
        $scope.steps = ['upload', 'edit', 'publish'];

        $scope.$on('$routeChangeStart', function(e, next, current) {
            var next_positon = $scope.steps.indexOf(next.$$route.controller);
            if (next_positon !== -1) {
                $scope.stepper_position = next_positon;
            }
        });

    }]);

})(window.angular);