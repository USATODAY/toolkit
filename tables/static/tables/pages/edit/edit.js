(function (angular) {
    'use strict';

    angular.module('edit', [
        'responsive-table'
    ])

    .controller('edit', ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams) {
        $scope.table_data_url = window.options.documents_json.url.substring(0, window.options.documents_json.url.length-1) + '?token=' + $routeParams.token
        console.log($routeParams.token);

    }])

})(window.angular);