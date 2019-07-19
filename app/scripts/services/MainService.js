'use strict';
angular.module('moneytrackerFrontendApp')
  .factory('MainService', function ($http) {

    return {
      expenseCategory: function(data){
        var category = data["category"];
        var username = data["username"];
        var token = data["token"];
        var req = {
          method:'GET',
          url: 'https://budget-tracker-backend-tarek.herokuapp.com/expenses/category',
          params: {
              category: category, 
              username: username
            },
        headers: {
                'Authorization': token
            }
        };
        return $http(req);
      },

      deleteExpense: function(data, token){
        var req = {
          method:'POST',
          url: 'https://budget-tracker-backend-tarek.herokuapp.com/expenses/delete',
          data: data,
          headers:{
            'Content-Type': 'application/json',
            'Authorization': token
          }
        };
        return $http(req);
      },

      deleteIncome: function(data, token){
        var req = {
          method:'POST',
          url: 'https://budget-tracker-backend-tarek.herokuapp.com/incomes/delete',
          data: data,
          headers:{
            'Content-Type': 'application/json',
            'Authorization': token
          }
        };
        return $http(req);
      },

      addExpense: function(data, token){
        var req = {
          method: 'POST',
          url: 'https://budget-tracker-backend-tarek.herokuapp.com/expenses/add',
          data: data,
          headers:{
            'Content-Type': 'application/json',
            'Authorization': token
          }
        };
        return $http(req);
      },

      addIncome: function(data, token){
        var req = {
          method: 'POST',
          url: 'https://budget-tracker-backend-tarek.herokuapp.com/incomes/add',
          data: data,
          headers:{
            'Content-Type': 'application/json',
            'Authorization': token
          }
        };
        return $http(req);
      },

      editExpense: function(data, token){
        var req = {
          method: 'POST',
          url: 'https://budget-tracker-backend-tarek.herokuapp.com/expenses/edit',
          data: data,
          headers:{
            'Content-Type': 'application/json',
            'Authorization': token
          }
        };
        return $http(req);
      },

      editIncome: function(data, token){
        var req = {
          method: 'POST',
          url: 'https://budget-tracker-backend-tarek.herokuapp.com/incomes/edit',
          data: data,
          headers:{
            'Content-Type': 'application/json',
            'Authorization': token
          }
        };
        return $http(req);
      },

      noteExpense: function(data, token){
        var req = {
          method: 'POST',
          url: 'https://budget-tracker-backend-tarek.herokuapp.com/expenses/note',
          data: data,
          headers:{
            'Content-Type': 'application/json',
            'Authorization': token
          }
        };
        return $http(req);
      },

      getNote: function(id, token){
        var req = {
          method: 'GET',
          url: 'https://budget-tracker-backend-tarek.herokuapp.com/expenses/notes',
          params: {
            id: id 
          },
          headers: {
              'Authorization': token
          }
        };
        return $http(req);
      },

      setReminder: function(data, token){
        console.log(data);
        var req = {
          method: 'POST',
          url: 'https://budget-tracker-backend-tarek.herokuapp.com/reminders/add',
          data: data,
          headers:{
            'Content-Type': 'application/json',
            'Authorization': token
          }
        };
        return $http(req);
      },

      getReminders: function(token){
        var req = {
          method: 'GET',
          url: 'https://budget-tracker-backend-tarek.herokuapp.com/reminders/get',
          headers: {
              'Authorization': token
          }
        };
        return $http(req);
      },

      getAllIncomes: function(username, token){
        var req = {
          method: 'GET',
          url: 'https://budget-tracker-backend-tarek.herokuapp.com/incomes/get',
          params: {
            username: username 
          },
          headers: {
              'Authorization': token
          }
        };
        return $http(req);
      },


    };
});