(function (angular) {
    'use strict';

    angular.module('edit', [
        'table-viz',
        'responsive-table',
        'xeditable',
        'oitozero.ngSweetAlert',
        'editor-api'
    ])

    .controller('edit', ['$scope', '$location', '$routeParams', 'SweetAlert', '$api', function ($scope, $location, $routeParams, SweetAlert, $api) {
        var self = this;
        
        this.publish = function() {
            $api.set_table_viz($scope.viz).then(function() {
                $location.path('publish/' + $routeParams.token);
            });
        };

        $scope.publish_btn = function() {
            var is_valid = true,
                error_msg = '';
            if (!$scope.viz.title || $scope.viz.title === '') {
                is_valid = false;
                error_msg = 'You must have a title to publish. Click on the title to edit it.'
            }
            else if (!$scope.viz.chatter || $scope.viz.chatter === '') {
                is_valid = false;
                error_msg = 'You must have a description to publish. Click on the description to edit it.'
            }
            else if (!$scope.viz.source || $scope.viz.source === '') {
                is_valid = false;
                error_msg = 'You must have a source to publish. Click on the source to edit it.'
            }
            if (is_valid) {
                self.publish();
            }
            else {
                SweetAlert.swal('OOPS!', error_msg, 'error');
            }
        };

        $api.get_table_viz({
            token: $routeParams.token
        }).then(function(response) {
            $scope.viz = response;
        })

    }])

})(window.angular);