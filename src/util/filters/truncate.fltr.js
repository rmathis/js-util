angular
.module(
    'lib.util.filters.truncate',
    []
)
.filter(
    'truncate',
    function() {
        'use strict';

        return function(input, len) {
            if (!input || !len) {
                return;
            }

            return input.substr(0, len);
        };
    }
);
