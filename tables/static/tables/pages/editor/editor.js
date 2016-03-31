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

    .controller('editor', ['$scope', '$location', function ($scope, $location) {
        $scope.steps = ['Upload', 'Edit', 'Publish'];

        $scope.$on('$routeChangeStart', function(next, current) {
            var path = $location.path();
            for (var i=0; i<$scope.steps.length; i+=1) {
                var step = $scope.steps[i].toLowerCase();
                if (path.indexOf(step) !== -1) {
                    $scope.stepper_position = i;
                    break;
                }
            }
        });

    }])
    
    .service('$manager', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {

        var self = this;
            

    }]);

})(window.angular);