'use strict';

/**
 * @ngdoc function
 * @name moneytrackerFrontendApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the moneytrackerFrontendApp
 */
angular.module('moneytrackerFrontendApp')
  .controller('HeaderCtrl', function ($scope, $window, $http, $location) {
    $scope.expenses = [];
    $scope.cat = 0;
    $scope.expense = {
      name: '',
      ammount: ''
    };

    $scope.logOutFun = function(){
        console.log("HELOOOOOOOOOOOO");
        $window.localStorage.clear();
        $location.path("/login");
        angular.element(document.getElementById('logOut')).attr("hidden", true);
    };
  });
