angular.module('app.services', [])

.factory('myService', function ($http) {

        var ergastAPI = {};
         
        ergastAPI.loginUser = function (data) {
            var req = {
                method: 'POST',
                url: '/login',
                data: data
            };
            return $http(req);
        }
        ergastAPI.registerUser = function (data) {
            var req = {
                method: 'POST',
                url: '/signup',
                data: data
            };
            return $http(req);

        }
        ergastAPI.home = function (data) {
            var req = {
                method: 'POST',
                url: '/home',
                data: data
            };
            return $http(req);

        }
        ergastAPI.ground = function (data) {
            var req = {
                method: 'POST',
                url: '/ground',
                data: data
            };
            return $http(req);

        }

        

        return ergastAPI;
}) ;