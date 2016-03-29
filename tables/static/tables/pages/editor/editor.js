(function (angular) {
    'use strict';

    angular.module('editor', [
        'ngTouch',
        'ngRoute',
        'stepper'
    ])
    
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
        $routeProvider
            .when('/', {
                controller: 'upload',
                templateUrl: (window.STATIC_ROOT || '') + 'tables/pages/upload/upload.html',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: '/'
            });
    
        // configure html5 links
        $locationProvider.html5Mode(false);
    }])

    .controller('upload', ['$scope', function ($scope) {
        console.log('upload')

    }])

   .controller('editor', ['$scope', function ($scope) {
        $scope.steps = ['Upload', 'Create', 'Preview', 'Publish']

    }])
    
    .service('$manager', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {

        var self = this;
            

    }]);

})(window.angular);