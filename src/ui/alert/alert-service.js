angular
.module(
    'lib.ui.alert.alert-service',
    []
)
.provider(
    'AlertService',
    function() {
        'use strict';

        // global alert configuration options
        var alertDefaults = {
                type: 'info',
                title: '',
                body: '',
                closeOnClick: true, // click or tap alert to close
                closeButton: true,
                timeout: 5000, // set to 0 to disable auto close
                onClick: angular.noop,
                onTimeout: angular.noop,
                onClose: angular.noop,
                onShow: angular.noop
            },
            globalConfig = {
                maxDisplayed: 5, // total that can show at one time
                latestFirst: true
            };

        this.setDefaults = function(options) {
            angular.extend(alertDefaults, options);
        };

        this.setDefault = function(key, value) {
            alertDefaults[key] = value;
        };

        this.setConfig = function(config) {
            angular.extend(globalConfig, config);
        };

        this.setConfigParam = function(key, value) {
            globalConfig[key] = value;
        };

        this.$get = [
            '$log',
            '$rootScope',
            function($log, $rootScope) {

                var svc = {};

                svc.getConfig = function() {
                    return angular.copy(globalConfig);
                };

                svc.getDefaults = function() {
                    return angular.copy(alertDefaults);
                };

                svc.add = function(options) {
                    var finalOptions = angular.extend({}, alertDefaults, options);

                    $rootScope.$broadcast('alert:add', finalOptions);
                };

                svc.clear = function() {
                    $rootScope.$broadcast('alert:clear');
                };

                return svc;
            }
        ];
    });
