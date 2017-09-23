angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

    .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })
    .state('menu.tournaments', {
    url: '/tournaments',
    views: {
      'side-menu21': {
        templateUrl: 'templates/tournaments.html',
        controller: 'tournamentsCtrl'
      }
    }
  })

  .state('menu.signUp', {
    url: '/signup',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signUp.html',
        controller: 'signUpCtrl'
      }
    }
  })

  .state('menu.login', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.mainPage2', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/mainPage2.html',
        controller: 'mainPage2Ctrl'
      }
    }
  })

  .state('menu.selectCategory', {
    url: '/selectCategory',
    views: {
      'side-menu21': {
    templateUrl: 'templates/selectCategory.html',
    controller: 'selectCategoryCtrl'
  }
}
  })

  .state('menu.finalOrder', {
    url: '/finalOrder',
    views: {
      'side-menu21': {
        templateUrl: 'templates/finalOrder.html',
        controller: 'finalOrderCtrl'
      }
    }
  })

  .state('menu.shopForm', {
    url: '/shopForm',
    views: {
      'side-menu21': {
        templateUrl: 'templates/shopForm.html',
        controller: 'shopFormCtrl'
      }
    }
  })

  .state('menu.buyerDetails', {
    url: '/buyerDetails',
    views: {
      'side-menu21': {
        templateUrl: 'templates/buyerDetails.html',
        controller: 'buyerDetailsCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/home')

});