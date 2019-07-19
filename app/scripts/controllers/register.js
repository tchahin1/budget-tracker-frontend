'use strict';

angular.module('moneytrackerFrontendApp')
  .controller('RegisterCtrl', function ($window, $scope, RegisterService) {
    $scope.$on('$routeChangeSuccess', function(){
      console.log('test');
    });

    $scope.registerFun = function () {
      var register = {
        name: $scope.info.first,
        lname: $scope.info.last,
        email: $scope.info.email, 
        username: $scope.info.username,
        password: $scope.info.pass,
      };

      RegisterService.register(register).then(function () {
          $window.location.href = '/#!/login';
      }).catch(function (){
        $scope.error='Username is taken!';
      });
    };
});