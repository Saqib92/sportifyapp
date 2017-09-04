 angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams','$ionicLoading','$ionicPopup','myService','$location','$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicLoading, $ionicPopup, myService, $location, $timeout) {
    var data = {};
    $scope.token = localStorage.getItem('token');
    console.log($scope.token);
    data.token = $scope.token;
      myService.home(data).success(function (res) {
            console.log(res);
            if(res.token){
                $location.path('side-menu21/home')
            }
            else{
                console.log("Error")
                $location.path('/side-menu21/login');
                
            }

                
            });

    $scope.bookMe = function(id){
        var grdObj = {status: "yes", id: id};
        myService.ground(grdObj).success(function(res){
            console.log(grdObj, "Checking ground status")
            console.log(res);
            if (res == true) {
                var alertPopup = $ionicPopup.alert({
                title: 'Booking Confirm',
                template: 'Thanks For Booking'
                });
        }
        else{
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Groung Not available'
                });
        }
        })
        
    };
}])
   
.controller('signUpCtrl', ['$scope', '$stateParams','$ionicLoading','$ionicPopup','myService','$location','$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicLoading, $ionicPopup, myService, $location, $timeout) {
    //ui route to login
    $scope.click = function(){
        $location.path('/side-menu21/login')
    }
    //signup function
    $scope.submit = function(name, email, password){
        userObj = {name:name, email: email, password: password};
        console.log(userObj,"signup ka function")
        localStorage.setItem('userObj', JSON.stringify(userObj));
        myService.registerUser(userObj).success(function (res) {
            console.log(res);
            if(res == true){
                $location.path('side-menu21/login')
            }
            else{
                console.log("Error in signup")
                alert("Email already Used")
            }

                
            });
    }


}])
   
.controller('loginCtrl', ['$scope', '$stateParams','$ionicLoading','$ionicPopup','myService','$location','$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicLoading, $ionicPopup, myService, $location, $timeout) {
//login function
	$scope.submit = function (email, password){

		userObj = {email: email, password: password};

		console.log(userObj,"login ka function")

		localStorage.setItem('userObj', JSON.stringify(userObj));

		myService.loginUser(userObj).success(function (res) {
            console.log(res)
            if(res.success == true){
                localStorage.setItem('token', res.token);
                console.log(localStorage.getItem('token'));
                $location.path('/side-menu21/home');

            }
            else{
                alert("please check Email or password")
            }

                
            });

	}


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('mainPage2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('selectCategoryCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('finalOrderCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('shopFormCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('buyerDetailsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 