angular
.module(
    'lib.math.remainder.filter',
    []
)
.filter(
    'remainder',
    [
        function () {
            'use strict';
            return function(input, multiplier) {
                multiplier = multiplier || 10;
                return (input % 1) * multiplier;
            };
        }
    ]
);
