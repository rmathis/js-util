angular
.module(
    'lib.form.input-match.dir',
    []
)
.directive(
    'inputMatch',
    [
        function () {
            'use strict';
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(
                        function (viewValue) {
                            var val = scope.$eval(attrs.inputMatch);
                            if (String(viewValue) !== String(val)) {
                                ctrl.$setValidity('match', false);
                                return undefined;
                            } else {
                                ctrl.$setValidity('match', true);
                                return viewValue;
                            }
                        }
                    );
                }
            };
        }
    ]
);
