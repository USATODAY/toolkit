(function(angular) {
    'use strict';

    angular.module('table-viz', [
        'responsive-table'
    ])

    .directive('tableViz', function () {
        return {
            scope: {
                url: '@',
                tableDataUrl: '@'
            },
            templateUrl: (window.STATIC_ROOT || '') + 'tables/components/table-viz/table-viz.html',
            restrict: 'E',
            controller: 'tableViz'
        };
    })

    .controller('tableViz', ['$scope', function($scope) {

        var self = this;

        console.log('hey!');

    }]);

})(window.angular);