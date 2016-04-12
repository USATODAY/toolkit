(function(root, factory) {
    if(typeof define === "function" && define.amd) {
        define(['lodash'], factory);
  } else if(typeof module === "object" && module.exports) {
        module.exports = factory(require('lodash'));
  } else {
        root.Analytics = factory(angular);
  }
}(this, function() {

    function getScript(src, callback) {
        var s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onreadystatechange = s.onload = function() {
            if (!callback.done && (!s.readyState || /loaded|complete/.test(s.readyState))) {
                callback.done = true;
                callback();
            }
        };
        document.querySelector('head').appendChild(s);
    }

    //array to hold queued analytics calls while library loads
    var queue = [];
    var isLoading = false;

    var Analytics = {

        isInitialized: false,
     
        hasUtag: false,
        
        clickArgs: {
            clicknameBase: "",
            eventtype: "uotrack",
            linkTrackEvents: "none",
            linkTrackVars: "prop41,prop64,prop16",
            contenttype: 'interactives',
            clickPage: location.href
        },
        
        pageViewArgs: {
            cst: 'news',
            hostname: 'www.usatoday.com',
            ssts: 'news',
            contenttype: 'interactives',
            prop16: 'interactives'
        },
     
        setPageViewArgs: function(options) {
            angular.extend(this.pageViewArgs, options);
            return this;
        },
     
        setClickArgs: function(options) {
            angular.extend(this.clickArgs, options);
            return this;
        },
     
        click: function(eventName, options) {
            eventName = eventName.replace(/ /g, '-');
            if (options) {
                options = angular.extend({}, this.clickArgs, options);
            } else if (eventName) {
                // replace event name spaces with '-'
                eventName = eventName.replace(/ /g, '-');
                options = angular.extend({}, this.clickArgs, {
                    clickName: this.clickArgs.clicknameBase + eventName
                });
            } else {
                options = angular.extend({}, this.clickArgs);
            }

            if (window.utag) {
                window.utag.track('link', options);
            }
            else {
                //queue event
                queue.push([eventName, options]);
                if (!isLoading) {
                    this.loadUtag();
                }
            }

        },
     
        // load utag script, loading with require causes errors, utag requires utag_data
        loadUtag: function() {
            isLoading = true;
            window.utag_data = angular.extend(this.pageViewArgs, {
                partner_type: 'basic'
            });
            var self = this,
                useSSL = 'https:' === document.location.protocol,
                src = "//tags.tiqcdn.com/utag/gci/usat/prod/utag.js";
                getScript(src, function() {
                    isLoading = false;
                    //loop through click queue
                    angular.forEach(queue, function(click) {
                        self.click(click[0], click[1]);
                    });

                    //reset queue
                    queue = [];
                });
        },
     
        pageView: function(eventName, options) {
            if (window.utag) {
                if (options) {
                    options = angular.extend(this.pageViewArgs, options);
                }
                else if (eventName)  {
                    // replace event name spaces with '-'
                    eventName = eventName.replace(/ /g, '-');
                    options = angular.extend(this.pageViewArgs, {
                        ssts: this.pageViewArgs.ssts + '/' + eventName
                    });
                }
                else {
                    options = this.pageViewArgs;
                }
                // initial page load, needed to use utag
                if (!this.hasUtag) {
                    options = angular.extend(options, {
                        partner_type: 'basic'
                    });
                    this.hasUtag = true;
                }
                window.utag.track('view', options);
            }
            else {
                this.loadUtag();
            }
        },
        setup: function(clicknameBase, opts) {
            opts = opts || {};
            if (!this.isInitialized) {
                this.setClickArgs({
                    'clicknameBase': 'usat-interactive-' + clicknameBase + '-'
                });

                this.setPageViewArgs(opts);

                this.loadUtag();

                this.isInitialized = true;
            }
        }
    };
    return Analytics;
}));