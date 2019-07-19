'use strict';
angular.module('moneytrackerFrontendApp')
  .factory('RegisterService', function ($http) {

    return {
      register: function(data){
        var req = {
          method:'POST',
          url: 'https://budget-tracker-backend-tarek.herokuapp.com/users/register',
          data: data,
          headers: {
            'Content-Type': 'application/json',
          }
        };
        return $http(req);
      },
    };
});