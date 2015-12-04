angular
.module(
    'lib.ui.dropdown.dropdown-select.dir',
    [
        'lib.parse.option-parser.service'
    ]
)
.directive(
    'dropdownSelect',
    [
        'OptionParser',
        function (parser) {
            'use strict';

            return {
                templateUrl: '/lib/form/dropdown-select.html',
                restrict: 'AE',
                require: 'ngModel',
                controller: [
                    function () {
                        var ctrl = this;
                        ctrl.toggled = function (open) {
                            ctrl.isOpen = open;
                        };
                    }
                ],
                controllerAs: 'ddCtrl',
                link: function (scope, element, attrs, ngModel) {
                    var parsed = parser.parse(attrs.dropdownSelect);
                    scope.$watchCollection(parsed.sourceName, function () {
                        var items = parsed.source(scope),
                            options = [],
                            locals = {};

                        angular.forEach(items, function (value, key) {
                            locals[parsed.itemName] = value;
                            options.push({
                                id: parser.optionId(scope, key, 'dropdown'),
                                label: parsed.viewMapper(scope, locals),
                                model: parsed.modelMapper(scope, locals)
                            });
                        });

                        scope.options = options;
                    });

                    if (!attrs.text) {
                        scope.$watch('value', function (val) {
                            if (scope.options) {
                                var opt;
                                angular.forEach(scope.options, function (o) {
                                    if (o.model ===  val) {
                                        opt = o;
                                    }
                                });
                                scope.text = opt.label;
                            }
                        });
                    } else {
                        attrs.$observe('text', function () {
                            scope.text = attrs.text;
                        });
                    }

                    attrs.$observe('direction', function () {
                        scope.direction = attrs.direction;
                    });

                    ngModel.$render = function() {
                        scope.value = ngModel.$viewValue;
                    };

                    scope.select = function (option) {
                        ngModel.$setViewValue(option.model);
                        ngModel.$render();
                    };
                }
            };
        }
    ]
);
