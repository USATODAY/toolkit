(function(angular) {
    'use strict';

    angular.module('table-viz', [
        'responsive-table'
    ])

    .run(function(editableOptions) {
        editableOptions.theme = 'default';
    })

    .directive('tableViz', function () {
        return {
            scope: {
                url: '@'
            },
            templateUrl: (window.STATIC_ROOT || '') + 'tables/components/table-viz/table-viz.html',
            restrict: 'E',
            controller: 'tableViz'
        };
    })

    // TODO Hide table until data is populated !important, creates funky animation
    // TODO create a tableviz view? doesn't need all the edit code?

    .controller('tableViz', ['$scope', function($scope) {


    }]);

})(window.angular);