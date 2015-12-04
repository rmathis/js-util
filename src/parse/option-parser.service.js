// Borrowed from Angular Core

angular
.module(
    'lib.parse.option-parser.service',
    []
)
.factory(
    'OptionParser',
    [
        '$parse',
        function ($parse) {
            'use strict';
            var OPTION_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
            return {
                parse:function (input) {
                    var match = input.match(OPTION_REGEXP);
                    if (!match) {
                        throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' + ' but got "' + input + '".');
                    }
                    return {
                        itemName: match[3],
                        source: $parse(match[4]),
                        sourceName: match[4],
                        viewMapper: $parse(match[2] || match[1]),
                        modelMapper: $parse(match[1])
                    };
                },
                optionId: function (scope, index, prefix) {
                    return (prefix || 'option') + '-' + scope.$id + '-' + Math.floor(Math.random() * 10000) + '-option-' + index;
                }
            };
        }
    ]
);
