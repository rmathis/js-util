'use strict';
angular
.module(
    'lib.event.broadcast',
    []
)
.directive(
    'broadcast',
    [
        '$rootScope',
        function ($rootScope) {
            return {
                priority:1000,
                link:function (scope, element, attr) {
                    var ev, args;
                    element.on('click', function () {
                        ev = attr.broadcast;
                        args = [];

                        if (attr.broadcastArgs) {
                            args = scope.$eval(attr.broadcastArgs);
                        }

                        args.unshift(ev);

                        $rootScope.$broadcast.apply(scope, args);
                    });
                }
            };
        }
    ]
);
