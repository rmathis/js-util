angular
.module(
    'lib.math.math.svc',
    []
)
.service(
    'Math',
    [
        function () {
            'use strict';

            var service = Math;

            service.tanh = Math.tanh || function (n) {
                var th = (Math.exp(n) - Math.exp(-n)) / (Math.exp(n) + Math.exp(-n));
                return th;
            };

            return service;

        }
    ]
);
