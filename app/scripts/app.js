'use strict';

/**
 * @ngdoc overview
 * @name moneytrackerFrontendApp
 * @description
 * # moneytrackerFrontendApp
 *
 * Main module of the application.
 */
var app = angular
  .module('moneytrackerFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-jwt',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        date:{
          authorization:true,
          redirectTo: 'login',
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register',
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  app.run(function ($rootScope, $location, $http, $window, authManager){
    var userData = $window.localStorage.getItem('token');
    authManager.checkAuthOnRefresh();
    /*console.log('token  = ' + userData);
    if (userData) {
      $http.defaults.headers.common.Authorization = userData;
    }*/
    $rootScope
      .$on('$locationChangeStart', function (event, next, current) {
        var restrictedPage
          = $location.path().indexOf('/login') === -1;
          var registerPage
          = $location.path().indexOf('/register') === -1;
        var loggedIn
          = $window.localStorage.getItem('token');
        var mainPage = $location.path().indexOf('/')!==-1;
        console.log('loggedIn:  = ' + loggedIn) ;
        console.log('mainPage' +  $location.path());
        if (restrictedPage && !loggedIn && registerPage) {
          $location.path('/login');
        }
      });
  });
