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
                console.log('hye!!');
            });
        };
        
        $scope.table_data_url = window.options.documents_json.url.substring(0, window.options.documents_json.url.length-1) + '?token=' + $routeParams.token;

        $scope.viz = {
            token: $routeParams.token,
            title: 'hey this is my title',
            chatter: 'chatter',
            source: 'my source'
        };
        //
        // $scope.$watch('viz', function() {
        //     console.log($scope.viz);
        // }, true);

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
    }])

})(window.angular);