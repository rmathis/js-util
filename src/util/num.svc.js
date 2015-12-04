angular
.module(
    'lib.util.num.service',
    []
)
.service(
    'num',
    [
        function () {
            'use strict';
            var service = {};

            service.range = function (start, end, inc) {
                var rng = [],
                    i = start;

                inc = inc || 1;

                while (i <= end) {
                    rng.push(i);
                    i = i + inc;
                }
                return rng;
            };

            return service;
        }
    ]
);
