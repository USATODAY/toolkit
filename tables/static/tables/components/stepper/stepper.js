(function(angular) {
    'use strict';

    angular.module('stepper', [
    ])

    .directive('stepper', function () {
        return {
            scope: {
                steps: '=',
                position: '=?'
            },
            templateUrl: (window.STATIC_ROOT || '') + 'tables/components/stepper/stepper.html',
            restrict: 'E',
            controller: 'stepper'
        };
    })

    .controller('stepper', ['$scope', function($scope) {

        var self = this;

        $scope.get_width = function() {
            return (($scope.position) / ($scope.steps.length - 1) * 100) + '%'
        };

        // set default position
        if (!$scope.position) {
            $scope.position = 0;
        }

    }]);

})(window.angular);