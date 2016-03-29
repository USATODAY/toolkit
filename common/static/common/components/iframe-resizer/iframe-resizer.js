(function(angular) {
    'use strict';

    angular.module('iframe-resizer', [
    ])

    .directive('iframeResize', ['$window', '$timeout', '$iframeResizer', function ($window, $timeout, $iframeResizer) {
        return {
            restrict: 'A',
            link: function($scope, $element, $attr) {
                $timeout(function() {
                    $iframeResizer.watch($element[0]);
                }, 0);
            }
        };
    }])

    .service('$iframeResizer', ['$rootScope', '$window', function($rootScope, $window) {

        var self = this;

        var w = angular.element($window),
            cur_height = 0;

        this.set_height = function() {
            var new_height = (self.height_calculator) ? self.height_calculator() : self.get_height();
            if (window.parent && window.parent.postMessage && new_height !== cur_height) {
                // use window.addEventListener("message", function(e) { console.log(e.data) }, false); to listen to messages
                window.parent.postMessage({
                    height: new_height
                }, '*');
                cur_height = new_height;
                // uncomment below to debug size
                // console.log(new_height);
            }
        };

        this.get_height = function () {
            var height = (self.el.offsetHeight !== undefined) ? self.el.offsetHeight : 0,
                style = getComputedStyle(self.el);
            height += parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.borderBottomWidth) + parseInt(style.borderTopWidth);
            return height;
        };

        this.bind_resize = function() {
            if (!self.resize_watcher) {
                self.resize_watcher = w.bind('resize', function () {
                    self.set_height();
                });
            }
        };

        this.watch = function(el, height_calculator) {
            self.el = el;
            self.height_calculator = height_calculator;
            self.bind_resize();
            self.set_height();
        };

    }]);

})(window.angular);