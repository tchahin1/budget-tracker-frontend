'use strict';
angular.module('moneytrackerFrontendApp')
  .factory('LoginService', function ($http) {

    return {
      login: function(data){
        var req = {
          method:'POST',
          url: 'https://budget-tracker-backend-tarek.herokuapp.com/login',
          data: data,
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return $http(req);
      },
    };
});