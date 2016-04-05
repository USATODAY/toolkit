(function (angular) {
    'use strict';

    angular.module('publish', [
    ])

    .controller('publish', ['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {

        var id = $routeParams.token ? $routeParams.token.split(':')[0] : null;

        // id not found, forward user to start upload
        if (id === null) {
            $location.path('upload');
        }

        $scope.publish_link = 'http://www.gannett-cdn.com/experiments/usatoday/responsive/data-tables/?data-id=' + id;
        $scope.edit_link = $location.absUrl().split('publish/')[0] + 'edit/' + $routeParams.token;

        $scope.copy_input_click = function($event) {
            $event.currentTarget.setSelectionRange(0, $event.currentTarget.value.length);
        }
    }])

})(window.angular);