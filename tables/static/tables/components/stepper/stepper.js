(function(angular) {
    'use strict';

    angular.module('stepper', [
    ])

    .directive('stepper', function () {
        return {
            scope: {
                steps: '=',
                position: '='
            },
            templateUrl: (window.STATIC_ROOT || '') + 'tables/components/stepper/stepper.html',
            restrict: 'E',
            controller: 'stepper'
        };
    })

    .controller('stepper', ['$scope', function($scope) {

        var self = this;

        $scope.get_width = function() {
            return (($scope.position - 1) / ($scope.steps.length - 1) * 100) + '%'
        };

        console.log($scope.$id);

    }]);

})(window.angular);