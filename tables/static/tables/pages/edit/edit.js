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

        this.get_cleaned_data = function() {
            var data = angular.copy($scope.viz);
            delete data.table_data;
            return data;
        };
        
        this.publish = function() {
            var data = self.get_cleaned_data();
            data.publish = true;
            $api.set_table_viz(data).then(function(response) {
                $location.path('publish/' + $routeParams.token);
            });
        };

        $scope.save = function() {
            var data = self.get_cleaned_data();
            data.publish = false;
            $api.set_table_viz(data);
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
            if (is_valid && !$scope.is_publshing) {
                $scope.is_publishing = true;
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