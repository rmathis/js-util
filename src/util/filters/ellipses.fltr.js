angular
.module(
    'lib.util.filters.ellipses',
    []
)
.filter(
    'ellipses',
    [
        function() {
            'use strict';

            return function(input, len, ellipsis) {
                if (!input || !len) {
                    return;
                }

                if (!ellipsis) {
                    ellipsis = '...';
                }

                if (input.length <= len) {
                    return input;
                } else {
                    return input.substr(0, len) + ellipsis;
                }
            };
        }
    ]
);
