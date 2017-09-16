angular.module('app.services', [])

.factory('myService', function ($http) {

        var ergastAPI = {};
         
        ergastAPI.loginUser = function (data) {
            var req = {
                method: 'POST',
                url: 'https://sportyfy.herokuapp.com/login',
                data: data
            };
            return $http(req);
        }
        ergastAPI.registerUser = function (data) {
            var req = {
                method: 'POST',
                url: 'https://sportyfy.herokuapp.com/signup',
                data: data
            };
            return $http(req);

        }
        ergastAPI.home = function (data) {
            var req = {
                method: 'POST',
                url: 'https://sportyfy.herokuapp.com/home',
                data: data
            };
            return $http(req);

        }
        ergastAPI.ground = function (data) {
            var req = {
                method: 'POST',
                url: 'https://sportyfy.herokuapp.com/ground',
                data: data
            };
            return $http(req);

        }

        

        return ergastAPI;
}) ;