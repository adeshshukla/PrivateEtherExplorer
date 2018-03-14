myApp.service('LoadingInterceptor',
    ['$q', '$rootScope', '$log',
        function ($q, $rootScope, $log) {
            'use strict';

            return {
                request: function (config) {
                    $rootScope.loading = true;
                    return config;
                },
                requestError: function (rejection) {
                    $rootScope.loading = false;
                    $log.error('Request error:', rejection);
                    return $q.reject(rejection);
                },
                response: function (response) {
                    $rootScope.loading = false;
                    return response;
                },
                responseError: function (rejection) {
                    $rootScope.loading = false;
                    $log.error('Response error:', rejection);
                    return $q.reject(rejection);
                }
            };
        }]);