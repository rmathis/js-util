angular
.module(
    'lib.ui.carousel.slide.dir',
    [
        'lib.ui.carousel.carousel.dir'
    ]
)
.directive(
    'slide',
    [
        function () {
            'use strict';
            return {
                require: '^carousel',
                scope: {
                    slide: '=slide'
                },
                templateUrl: '/lib/ui/carousel/slide.html',
                link: function (scope, elm, attr, carousel) {
                    carousel.addSlide(scope, elm);
                    elm.addClass('item');
                    //when the scope is destroyed then remove the slide from the current slides array
                    scope.$on('$destroy', function() {
                        carousel.removeSlide(scope);
                    });

                    scope.$watch('active', function(active) {
                        if (active) {
                            carousel.select(scope);
                        }
                    });
                },
                transclude: true
            };
        }
    ]
);
