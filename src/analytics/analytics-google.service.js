// Originally taken from Jeff Cross, heavily expanded and reworked

angular
.module('lib.analytics.google.service', [])
.provider(
    'GoogleAnalytics',
    function () {
        'use strict';

        var _profileId = '',
            _host = '',
            _devMode = false,
            options = {};

        function idIsValid (id) {
            if (!id) { return false; }
            return (/^(ua|yt|mo)-\d{4,9}-\d{1,4}$/i).test(id.toString());
        }

        this.setProfile = function (profile) {
            if (idIsValid(profile)) {
                _profileId = profile;
            }
        };

        this.setHost = function (host) {
            _host = host;
        };

        this.setDevMode = function (mode) {
            _devMode = mode;
        };

        this.setOptions = function (obj) {
            angular.extend(options, obj);
        };

        this.$get = [
            '$log',
            '$location',
            '$window',
            '$document',
            '$timeout',
            function ($log, $location, $window, $document, $timeout) {
                var loadInterval = 100,
                    ready = false,
                    gaTracker,
                    tracker,
                    loadTracker, checkIfAvailable, wrap, track;

                loadTracker = function () {
                    var gaHost,
                        s,
                        checker;

                    gaHost = ('https' === $location.protocol()) ? 'https://ssl.' : 'http://www.';
                    s = $window.document.createElement('script');
                    s.src = gaHost + 'google-analytics.com/analytics.js';
                    $window.document.getElementsByTagName('head')[0].appendChild(s);
                    checker = wrap(this, checkIfAvailable);
                    $timeout(checker, loadInterval);
                };

                checkIfAvailable = function () {
                    var checker;

                    if ($window.ga) {
                        gaTracker = $window.ga.create({
                            trackingId: _profileId,
                            cookieDomain: (_devMode) ? 'none' : 'auto'
                        });
                        gaTracker.set(options);
                        ready = true;
                    } else {
                        checker = wrap(this, checkIfAvailable);
                        $timeout(checker, loadInterval);
                    }
                };

                wrap = function (obj, method) {
                    return function () {
                        return method.apply(obj, arguments);
                    };
                };

                track = function (options) {
                    if (_profileId) {
                        if (ready) {
                            gaTracker.send(options);
                        } else {
                            tracker = wrap(this, track);
                            $timeout(function () {
                                tracker(options);
                            }, loadInterval);
                        }
                    }
                };

                this.trackPageview = function (page) {
                    track(
                        {
                            hitType: 'pageview',
                            page: page
                        }
                    );
                };

                this.trackEvent = function (category, action, label) {
                    track(
                        {
                            hitType: 'event',
                            eventCategory: category,
                            eventAction: action,
                            eventLabel: label
                        }
                    );
                };

                this.loadTracker = loadTracker();

                if (_profileId) {
                    loadTracker();
                } else {
                    $log.warn('Invalid Google Analytics ID given, please ensure its a valid ID like the following example: UA-XXXXXXX-X');
                }

                return this;
            }
        ];
    }
);
