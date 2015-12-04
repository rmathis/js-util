angular
.module(
    'lib.authentication.session.service',
    []
)
.provider(
    'Session',
    [
        function () {
            'use strict';

            var map = {},
                storageProvider;

            this.addKeys = function (obj) {
                angular.extend(map, obj);
            };

            this.setStorageProvider = function (store) {
                storageProvider = store;
            };

            this.$get = [
                '$q',
                '$log',
                '$rootScope',
                '$injector',
                function ($q, $log, $rootScope, $injector) {

                    var service = {},
                        session = {},
                        storedValue,
                        test,
                        storage = storageProvider ? $injector.invoke(storageProvider) : null;

                    if (storage) {
                        angular.forEach(map, function (value, key) {
                            storedValue = storage.get(key);
                            try {
                                test = JSON.parse(storedValue);
                            } catch (error) {
                                test = storedValue;
                            }

                            session[key] = test;
                        });
                    } else {
                        session = angular.copy(map);
                    }

                    function saveToStorage(obj) {
                        var deferred = $q.defer();
                        if (storage) {
                            angular.forEach(obj, function (value, key) {
                                storage.set(key, value);
                            });
                        }
                        deferred.resolve(angular.copy(obj));

                        return deferred.promise;
                    }

                    service.destroy = function () {
                        session = angular.copy(map);
                        $rootScope.$broadcast('session:destroyed', session);
                        return saveToStorage(session);
                    };

                    service.set = function (key, val) {
                        if (angular.isArray(key)) { return $q.reject('SET method requires a string or js object'); }

                        var obj = key;

                        if (angular.isString(key) && val) {
                            obj = {};
                            obj[key] = val;
                        }

                        angular.forEach(obj, function (value, key) {
                            if (map.hasOwnProperty(key)) {
                                try {
                                    test = JSON.parse(value);
                                } catch (error) {
                                    test = value;
                                }

                                session[key] = test;
                            } else {
                                $log.error('Map does not contain ' + key);
                            }
                        });

                        $rootScope.$broadcast('session:updated', session);

                        return saveToStorage(session);
                    };

                    service.get = function (key) {
                        if (!key) {
                            return angular.copy(session);
                        }
                        return session.hasOwnProperty(key) ? session[key] : null;
                    };

                    return service;
                }
            ];
        }
    ]
);
