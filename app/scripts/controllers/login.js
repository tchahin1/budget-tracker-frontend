'use strict';
angular.module('moneytrackerFrontendApp')
  .controller('LoginCtrl', function ($location, $http, $scope, $window, $rootScope, LoginService, authManager) {
    $scope.credentials = {
      username: '',
      pass: ''
    };

    $scope.loginFun = function(){
      var loginInfo = {
        username : $scope.credentials.username,
        password : $scope.credentials.pass
      };

      (function initController(){
        $window.localStorage.setItem('token', '');
        authManager.unauthenticate();  
      })();

      LoginService.login(loginInfo).then(function (res){
        console.log(res["data"]["token"]);
          $window.localStorage.setItem('token', res["data"]["token"]);
          $window.localStorage.setItem('userInfo', res["data"]["user"]);
          $window.location.href = '/#!/';
          authManager.authenticate();
      }).catch(function (){
        $scope.error='Email or password is incorrect!';
      });
    };
});