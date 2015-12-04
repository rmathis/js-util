// Originally taken from Ben Sparks, expanded and reworked

angular
.module(
    'lib.ui.alert.alert.dir',
    [
        'lib.ui.alert.alert-container.dir',
        'lib.ui.alert.alert-service'
    ]
)
.directive(
    'alert',
    [
        '$timeout',
        function($timeout) {
            'use strict';

            return {
                require: '^alertContainer',
                restrict: 'EA',
                scope: {
                    alertOptions: '='
                },
                templateUrl: '/lib/ui/alert/alert.html',
                link: function (scope, el, attrs, containerCtrl) {
                    scope.alert = scope.alertOptions;

                    if (scope.alert.closeOnClick) {
                        el.on('click', function () {
                            containerCtrl.remove(scope.alert.id);
                            scope.$apply();
                        });
                    }

                    if (scope.alert.timeout > 0) {
                        scope.autoCloseTimeout = $timeout(function () {
                            containerCtrl.remove(scope.alert.id);
                        }, scope.alert.timeout);
                    }

                    scope.$on('$destroy', function () {
                        if (scope.autoCloseTimeout) {
                            $timeout.cancel(scope.autoCloseTimeout);
                        }
                    });
                }
            };
        }
    ]
);
