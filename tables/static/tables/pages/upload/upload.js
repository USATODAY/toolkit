(function (angular) {
    'use strict';

    angular.module('upload', [
            'ngFileUpload'
        ])

        .controller('upload', ['$scope', 'Upload', function ($scope, Upload) {

            $scope.$watch('file', function () {
                console.log($scope.file);
                if ($scope.file) {
                    $scope.upload($scope.file);
                }
            });

            $scope.upload = function (file) {
                var error = function(message) {
                    if (message) {
                        alert(message);
                    }
                    else {
                        alert('Upload Failed');
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
                    else {
                        console.log('success!');
                    }
                }, function(response) {
                    error();
                }, function (evt) {
                    // console.log(evt);
                });
            };

        }])

})(window.angular);