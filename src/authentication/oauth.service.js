angular
.module(
    'lib.authentication.oauth.service',
    [
        'lib.authentication.connect-window.service',
        'lib.http.api.service'
    ]
)
.provider(
    'OAuth',
    [
        function () {
            'use strict';

            var client,
                apiMap = {
                    register: '/register',
                    login: '/login',
                    associate: '/associate',
                    getLocalToken: '/getLocalToken',
                    external: '/externalLogin'
                };

            this.setClient = function (clientId) {
                if (client) { return new Error ('Client ID is already defined!'); }
                client = clientId;
            };

            this.setApiMap = function (map) {
                angular.extend(apiMap, map);
            };

            this.$get = [
                '$q',
                '$rootScope',
                '$httpParamSerializer',
                'Api',
                function ($q, $rootScope, $httpParamSerializer, Api) {

                    var service = {};

                    service.register = function (userData) {
                        //service.logout();
                        return Api.post(apiMap.register, userData).then(function (response) {
                            return response;
                        });
                    };

                    service.getLocalAccessToken = function (provider, token) {
                        var params = {
                                provider: provider,
                                externalAccessToken: token
                            };

                        return Api.get(apiMap.getLocalToken, {params: params}).then(
                            function (response) {
                                return response.data;
                            },
                            function (err) {
                                service.logout();
                                return $q.reject(err);
                            }
                        );
                    };

                    service.associate = function (provider, username, token) {
                        var data = {
                            userName: username,
                            provider: provider,
                            externalAccessToken: token
                        };
                        return Api.post(apiMap.associate, data).success(function (response) {
                            return response.data;
                        }).error(function (err) {
                            service.logout();
                            return $q.reject(err);
                        });
                    };

                    service.login = function (username, password) {
                        var data = {
                                grant_type: 'password',
                                username: username,
                                password: password,
                                client_id: client
                            },
                            headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

                        return Api.post(
                                    apiMap.login,
                                    data,
                                    {
                                        headers: headers,
                                        transformRequest: function (data) {
                                            return $httpParamSerializer(data);
                                        }
                                    }
                                ).then(
                                    function (response) {
                                        if (response.status === 0) {
                                            return $q.reject(response);
                                        }
                                        return response.data;
                                    },
                                    function (err) {
                                        service.logout();
                                        return $q.reject(err);
                                    }
                                );
                    };

                    service.refresh = function (refreshToken) {
                        var data = {
                                grant_type: 'refresh_token',
                                refresh_token: refreshToken,
                                client_id: client
                            },
                            headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

                        return Api.post(
                                apiMap.login,
                                data,
                                {
                                    headers: headers,
                                    transformRequest: function (data) {
                                        return $httpParamSerializer(data);
                                    }
                                }
                            ).then(
                                function (response) {
                                    return response.data;
                                },
                                function (err) {
                                    service.logout();
                                    return $q.reject(err);
                                }
                            );
                    };

                    service.logout = function (redirect) {
                        $rootScope.$broadcast('auth:logout', redirect);
                    };

                    return service;

                }
            ];
        }
    ]
);
