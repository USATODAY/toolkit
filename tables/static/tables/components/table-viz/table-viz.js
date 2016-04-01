(function(angular) {
    'use strict';

    angular.module('table-viz', [
        'responsive-table',
        'xeditable'
    ])

    .run(function(editableOptions) {
        editableOptions.theme = 'default';
    })

    .directive('tableViz', function () {
        return {
            scope: {
                url: '@',
                tableDataUrl: '@',
                editable: '='
            },
            templateUrl: (window.STATIC_ROOT || '') + 'tables/components/table-viz/table-viz.html',
            restrict: 'E',
            controller: 'tableViz'
        };
    })

    //    TODO create a tableviz view? doesn't need all the edit code?

    .controller('tableViz', ['$scope', function($scope) {

        var self = this;

        $scope.viz = {};

        $scope.$watch('viz', function() {
            console.log($scope.viz);
        }, true)


    }]);

})(window.angular);