angular
.module(
    'lib.math.percentage.filter',
    [
        'underscore.js'
    ]
)
.filter(
    'percentage',
    [
        'underscore',
        function (_) {
            'use strict';
            return function(input, list, val) {
                var amounts = _.pluck(list, val),
                    i = 0,
                    l = amounts.length,
                    t = 0;

                for (i; i < l; i++) {
                    t = t + amounts[i];
                }

                return (input / t) * 100;
            };
        }
    ]
);
