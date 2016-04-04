(function (angular) {
    'use strict';

    angular.module('upload', [
        'ngFileUpload',
        'oitozero.ngSweetAlert'
    ])

    .controller('upload', ['$scope', 'Upload', '$location', 'SweetAlert', function ($scope, Upload, $location, SweetAlert) {

        $scope.$watch('file', function () {
            if ($scope.file) {
                $scope.upload($scope.file);
            }
        });

        $scope.upload = function (file) {
            var error = function(message) {
                if (message) {
                    SweetAlert.swal('OOPS!', message, 'error');
                }
                else {
                    SweetAlert.swal('OOPS!', 'Upload Failed', 'error');
                }
            };

            Upload.upload({
                url: window.options.upload.url,
                headers: {
                    'X-CSRFToken': window.options.csrf_token
                },
                method: 'POST',
                data: {
                    file: file
                }
            }).then(function (response) {
                if (response && response.data && response.data.error) {
                    error(response.data.message);                        
                }
                else if (response && response.data && response.data.token) {
                    $location.path('edit/' + response.data.token);
                }
                else {
                    error();
                }
            }, function(response) {
                error();
            });
        };

    }])

})(window.angular);