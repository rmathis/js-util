angular
.module(
    'lib.ui.carousel.carousel.dir',
    [
        'lib.ui.carousel.slide.dir'
    ]
)
.directive(
    'carousel',
    [
        function () {
            'use strict';
            return {
                scope: {
                    animation: '@'
                },
                templateUrl: '/lib/ui/carousel/carousel.html',
                controller: [
                    '$log',
                    '$scope',
                    function ($log, $scope) {
                        var ctrl = this,
                            slides = [];

                        ctrl.currentIndex = -1;
                        ctrl.slides = slides;
                        ctrl.currentSlide = null;

                        function getSlideByIndex(index) {
                            if (angular.isUndefined(slides[index].index)) {
                                return slides[index];
                            }
                            var i = 0,
                                l = slides.length;
                            for (i; i < l; ++i) {
                                if (slides[i].index === index) {
                                    return slides[i];
                                }
                            }
                        }

                        ctrl.getCurrentIndex = function() {
                            if (ctrl.currentSlide && angular.isDefined(ctrl.currentSlide.index)) {
                                return +ctrl.currentSlide.index;
                            }
                            return ctrl.currentIndex;
                        };

                        /* Allow outside people to call indexOf on slides array */
                        ctrl.indexOfSlide = function(slide) {
                            return angular.isDefined(slide.index) ? +slide.index : slides.indexOf(slide);
                        };

                        $scope.isActive = function(slide) {
                            return ctrl.currentSlide === slide;
                        };

                        ctrl.select = $scope.select = function(nextSlide, direction) {
                            var nextIndex = ctrl.indexOfSlide(nextSlide);
                            if (direction === undefined) {
                                direction = nextIndex > ctrl.getCurrentIndex() ? 'next' : 'prev';
                            }
                            angular.extend(ctrl.currentSlide || {}, {direction: direction, active: false});
                            angular.extend(nextSlide, {direction: direction, active: true});

                            ctrl.currentSlide = nextSlide;
                            ctrl.currentIndex = nextIndex;
                        };

                        ctrl.addSlide = function (slide, element) {
                            slide.$element = element;
                            slides.push(slide);
                            if (slides.length === 1 || slide.active) {
                                ctrl.select(slides[slides.length - 1]);
                            } else {
                                slide.active = false;
                            }
                        };

                        ctrl.removeSlide = function (slide) {
                            if (angular.isDefined(slide.index)) {
                                slides.sort(function(a, b) {
                                    return +a.index > +b.index;
                                });
                            }
                            var index = slides.indexOf(slide);
                            slides.splice(index, 1);
                            if (slides.length > 0 && slide.active) {
                                if (index >= slides.length) {
                                    ctrl.select(slides[index - 1]);
                                } else {
                                    ctrl.select(slides[index]);
                                }
                            } else if (ctrl.currentIndex > index) {
                                ctrl.currentIndex--;
                            }
                        };

                        ctrl.next = function () {
                            var newIndex = (ctrl.getCurrentIndex() + 1) % slides.length;
                            return ctrl.select(getSlideByIndex(newIndex), 'next');
                        };

                        ctrl.prev = function () {
                            var newIndex = ctrl.getCurrentIndex() - 1 < 0 ? slides.length - 1 : ctrl.getCurrentIndex() - 1;
                            return ctrl.select(getSlideByIndex(newIndex), 'prev');
                        };
                    }
                ],
                controllerAs: 'carousel',
                bindToController: true,
                transclude: true
            };
        }
    ]
);
