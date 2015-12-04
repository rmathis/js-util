angular
.module('lib.util.filters.strip', [])
.filter('strip',
    [
        function() {
            'use strict';
            return function(input, chars) {
                if (!input) { return; }

                angular.forEach(chars, function (char) {
                    input = input.replace(char, '');
                });

                return input;
            };
        }
    ]
);
