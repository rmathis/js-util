// Originally taken from Ben Sparks, expanded and reworked

angular
.module(
    'lib.ui.alert.alert-container.dir',
    []
)
.directive(
    'alertContainer',
    [
        '$log',
        '$window',
        'AlertService',
        function($log, $window, AlertService) {
            'use strict';

            return {
                restrict: 'EA',
                scope: true,
                templateUrl: '/lib/ui/alert/alert-container.html',
                controller: [
                    '$scope',
                    function($scope) {
                        var ctrl = this,
                            alertId = 0,
                            config = alertService.getConfig();

                        ctrl.remove = function(alertId) {
                            ctrl.alerts = ctrl.alerts.filter(function(note) {
                                if (note.id !== alertId) {
                                    return note;
                                }
                            });
                        };

                        ctrl.reverse = config.latestFirst;
                        ctrl.predicate = 'id'; // could be a timestamp?
                        ctrl.alerts = [];

                        $scope.$on('alert:add', function(e, opts) {
                            opts.id = alertId++;
                            ctrl.alerts.push(opts);
                            if (config.maxDisplayed && ctrl.alerts.length > config.maxDisplayed) {
                                ctrl.remove(ctrl.alerts[0].id);
                            }
                        });

                        $scope.$on('alert:clear', function() {
                            ctrl.alerts = [];
                        });
                    }
                ],
                controllerAs: 'alertCtrl'
            };
        }
    ]
);
