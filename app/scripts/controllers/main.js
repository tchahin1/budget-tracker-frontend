'use strict';

/**
 * @ngdoc function
 * @name moneytrackerFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moneytrackerFrontendApp
 */
angular.module('moneytrackerFrontendApp')
  .controller('MainCtrl', function ($scope, $window, $http, MainService, $timeout) {
    $scope.expenses = [];
    $scope.incomes = [];
    $scope.cat = 0;
    $scope.expense = {
      name: '',
      ammount: ''
    };
    $scope.income = {
      name: '',
      ammount: ''
    };
    $scope.editExpense = {
      id: '',
      note: ''
    };
    $scope.notesText = {
      text: ''
    };
    $scope.reminder = {
      expenseId: '',
      date: '',
      time: '',
      text: ''
    }

    angular.element(document.getElementById('logOut')).attr("hidden", false);

    $scope.changeTabFun = function(tab){
      if(tab === 'e'){
        angular.element(document.getElementById('expenses-content')).attr("hidden", false);
        angular.element(document.getElementById('incomes-content')).attr("hidden", true);
        angular.element(document.getElementById('app-message')).attr("hidden", true);
        angular.element(document.getElementById('tableContainer')).attr("hidden", true);
        angular.element(document.getElementById('category-message')).attr("hidden", false);
        angular.element(document.getElementById('nothing-message')).attr("hidden", true);  
      }
      else{
        angular.element(document.getElementById('expenses-content')).attr("hidden", true);
        angular.element(document.getElementById('incomes-content')).attr("hidden", false);
        angular.element(document.getElementById('app-message')).attr("hidden", true);
        $scope.getIncomes();
      }
    };

    $scope.deleteFun = function(expense){
        var token = $window.localStorage.getItem("token");
        var expenseDelInfo = {
          id: expense.id
        };

        MainService.deleteExpense(expenseDelInfo, token).then(function(res){
            for(var i=0; i<$scope.expenses.length; i++){
              if($scope.expenses[i].id === expenseDelInfo.id) $scope.expenses.splice(i,1);
            }
        }).catch(function(err){
            console.log("error", err);
        });
    };

    $scope.deleteIncomeFun = function(income){
        var token = $window.localStorage.getItem("token");
        var incomeDelInfo = {
          id: income.id
        };

        MainService.deleteIncome(incomeDelInfo, token).then(function(res){
            for(var i=0; i<$scope.incomes.length; i++){
              if($scope.incomes[i].id === incomeDelInfo.id) $scope.incomes.splice(i,1);
            }
        }).catch(function(err){
            console.log("error", err);
        });
    };

    $scope.openAddForm = function(obj){
      angular.element(document.getElementById('tableContainer')).attr("hidden", false);
      angular.element(document.getElementById('dataTable')).attr("hidden", true);
      angular.element(document.getElementById('nothing-message')).attr("hidden", true);
      angular.element(document.getElementById('addEditContainer')).attr("hidden", false);
      angular.element(document.getElementById('noteContainer')).attr("hidden", true);
      angular.element(document.getElementById('reminderContainer')).attr("hidden", true);
      if(obj!==0){
        $scope.expense.name = obj.name;
        $scope.expense.ammount = obj.ammount;
        angular.element(document.getElementById('editSaveButton')).attr("hidden", false);
        angular.element(document.getElementById('addSaveButton')).attr("hidden", true);
        $window.localStorage.setItem("expenseId", obj.id);
      }
      else{
        $scope.expense.name = "";
        $scope.expense.ammount = "";
        angular.element(document.getElementById('editSaveButton')).attr("hidden", true);
        angular.element(document.getElementById('addSaveButton')).attr("hidden", false);
      }
    };

    $scope.openAddIncomeForm = function(obj){
      angular.element(document.getElementById('tableContainer-incomes')).attr("hidden", false);
      angular.element(document.getElementById('dataTable-incomes')).attr("hidden", true);
      angular.element(document.getElementById('nothing-message-incomes')).attr("hidden", true);
      angular.element(document.getElementById('addEditContainer-incomes')).attr("hidden", false);
      if(obj!==0){
        $scope.income.name = obj.name;
        $scope.income.ammount = obj.ammount;
        angular.element(document.getElementById('editSaveIncomeButton')).attr("hidden", false);
        angular.element(document.getElementById('addSaveIncomeButton')).attr("hidden", true);
        $window.localStorage.setItem("incomeId", obj.id);
      }
      else{
        $scope.income.name = "";
        $scope.income.ammount = "";
        angular.element(document.getElementById('editSaveIncomeButton')).attr("hidden", true);
        angular.element(document.getElementById('addSaveIncomeButton')).attr("hidden", false);
      }
    };

    $scope.openNoteForm = function(obj){
      angular.element(document.getElementById('tableContainer')).attr("hidden", false);
      angular.element(document.getElementById('dataTable')).attr("hidden", true);
      angular.element(document.getElementById('nothing-message')).attr("hidden", true); 
      angular.element(document.getElementById('noteContainer')).attr("hidden", false);
      angular.element(document.getElementById('addEditContainer')).attr("hidden", true);
      angular.element(document.getElementById('reminderContainer')).attr("hidden", true);
      if(obj!=0){
        $scope.editExpense.id = obj.id;
      }
    };

    $scope.openRemindForm = function(obj){
      angular.element(document.getElementById('tableContainer')).attr("hidden", false);
      angular.element(document.getElementById('dataTable')).attr("hidden", true);
      angular.element(document.getElementById('nothing-message')).attr("hidden", true); 
      angular.element(document.getElementById('noteContainer')).attr("hidden", true);
      angular.element(document.getElementById('addEditContainer')).attr("hidden", true);
      angular.element(document.getElementById('reminderContainer')).attr("hidden", false);
      if(obj!=0){
        $scope.reminder.expenseId = obj.id;
      }
    };

    $scope.addFun = function(){
      var expenseInfo = {
        categoryId : $scope.cat,
        name : $scope.expense.name,
        ammount: $scope.expense.ammount.toString(),
        userId: $window.localStorage.getItem("userInfo")
      };
      
      var token = $window.localStorage.getItem("token");
      //console.log(expenseInfo);
      MainService.addExpense(expenseInfo, token).then(function(res){
        $scope.category($scope.cat);
      }).catch(function(err){
          //console.log("error", err);
      });
    };

    $scope.addIncomeFun = function(){
      var incomeInfo = {
        name : $scope.income.name,
        ammount: $scope.income.ammount.toString(),
        userId: $window.localStorage.getItem("userInfo")
      };
      
      var token = $window.localStorage.getItem("token");
      MainService.addIncome(incomeInfo, token).then(function(res){
        $scope.getIncomes();
      }).catch(function(err){
          //console.log("error", err);
      });
    };

    $scope.editFun = function(){
      var expenseInfo = {
        categoryId : $scope.cat,
        name : $scope.expense.name,
        ammount: $scope.expense.ammount.toString(),
        userId: $window.localStorage.getItem("userInfo"),
        id: $window.localStorage.getItem("expenseId")
      }
      
      var token = $window.localStorage.getItem("token");
      MainService.editExpense(expenseInfo, token).then(function(res){
        $scope.category($scope.cat);
      }).catch(function(err){
          //console.log("error", err);
      });
    };

    $scope.editIncomeFun = function(){
      var incomeInfo = {
        name : $scope.income.name,
        ammount: $scope.income.ammount.toString(),
        userId: $window.localStorage.getItem("userInfo"),
        id: $window.localStorage.getItem("incomeId")
      }
      
      var token = $window.localStorage.getItem("token");
      MainService.editIncome(incomeInfo, token).then(function(res){
        $scope.getIncomes();
      }).catch(function(err){
          //console.log("error", err);
      });
    };

    $scope.noteFun = function(){
      var expenseInfo = {
        id : $scope.editExpense.id,
        note : $scope.editExpense.note
      }
      var token = $window.localStorage.getItem("token");
      MainService.noteExpense(expenseInfo, token).then(function(res){
        $scope.category($scope.cat);
      }).catch(function(err){

      });
    };

    $scope.remindFun = function(){
      $scope.reminder.date = document.getElementById("datefield").value;
      $scope.reminder.time = document.getElementById("timefield").value;
      var token = $window.localStorage.getItem("token");
      MainService.setReminder($scope.reminder, token).then(function(res){
        $scope.category($scope.cat);
      }).catch(function(err){

      });
    }

    $scope.getReminders = function() {
      var token = $window.localStorage.getItem("token");
      MainService.getReminders(token).then(function(res) {
        if(res.data.length != 0){
          document.getElementById('reminders').style.display="block";
          for(var i=0; i<res.data.length; i++){
            var name = res.data[i].expense.name;
            var message = res.data[i].message;
            var reminders = document.getElementById('reminders');
            reminders.innerHTML += "<p id='reminderElement'>" +(i+1)+ ". " +name+ ": " +message+ "</p>";
          }
        }
        setTimeout(giveMeABreak, 300000);
      }).catch(function(err){
        setTimeout(giveMeABreak, 300000);
      });
    };

    setTimeout(giveMeABreak(), 500);

    function giveMeABreak(){
      setTimeout($scope.getReminders(), 500);
    }

    $scope.showNote = function(obj){
      var token = $window.localStorage.getItem("token");
      MainService.getNote(obj.id, token).then(function(res){
        angular.element(document.getElementById('showNoteContainer')).attr("hidden", false);
        if(res.data.note!=null && res.data.note!=="") 
        {
          var note = res.data.note;
          $scope.notesText.text = "Note: " + note;
        }
        else angular.element(document.getElementById('showNoteContainer')).attr("hidden", true);
      }).catch(function(err){
        angular.element(document.getElementById('showNoteContainer')).attr("hidden", true);
      });
    };

    $scope.hideNote = function(){
      angular.element(document.getElementById('showNoteContainer')).attr("hidden", true);
    };

    $scope.category = function(category){
      var expenseInfo = {
        category : category,
        username : $window.localStorage.getItem("userInfo"),
        token: $window.localStorage.getItem("token")
      };

      $scope.cat = category;

      MainService.expenseCategory(expenseInfo).then(function (res, err){
        var json = res.data;
        if(res.status === 200)
        {
          angular.element(document.getElementById('category-message')).attr("hidden", true);
          angular.element(document.getElementById('nothing-message')).attr("hidden", true);
          angular.element(document.getElementById('tableContainer')).attr("hidden", false);
          angular.element(document.getElementById('addButtonContainer')).attr("hidden", false);
          angular.element(document.getElementById('dataTable')).attr("hidden", false);
          angular.element(document.getElementById('addEditContainer')).attr("hidden", true);
          angular.element(document.getElementById('noteContainer')).attr("hidden", true);
          angular.element(document.getElementById('reminderContainer')).attr("hidden", true);
          $scope.expenses = [];
          for(var i=0; i<json.length; i++){
            $scope.newItem = {
              id: json[i]["id"],
              name : json[i]["name"],
              ammount : json[i]["ammount"],
            };
            $scope.expenses.push($scope.newItem);
          }
          //console.log($scope.expenses);
        }
        else if(res.status !== 200)
        {
          angular.element(document.getElementById('category-message')).attr("hidden", true);
          angular.element(document.getElementById('nothing-message')).attr("hidden", false);
          angular.element(document.getElementById('tableContainer')).attr("hidden", true);
          angular.element(document.getElementById('addButtonContainer')).attr("hidden", false);
        }
      }).catch(function (error){
          angular.element(document.getElementById('category-message')).attr("hidden", true);
          angular.element(document.getElementById('nothing-message')).attr("hidden", false);
          angular.element(document.getElementById('tableContainer')).attr("hidden", true);
          angular.element(document.getElementById('addButtonContainer')).attr("hidden", false);  
      });
    };

    $scope.getIncomes = function(){
      var username = $window.localStorage.getItem("userInfo");
      var token = $window.localStorage.getItem("token");

      MainService.getAllIncomes(username, token).then(function (res){
        var json = res.data;
        if(res.status === 200)
        {
          angular.element(document.getElementById('nothing-message-incomes')).attr("hidden", true);
          angular.element(document.getElementById('tableContainer-incomes')).attr("hidden", false);
          angular.element(document.getElementById('addButtonContainer-incomes')).attr("hidden", false);
          angular.element(document.getElementById('dataTable-incomes')).attr("hidden", false);
          angular.element(document.getElementById('addEditContainer-incomes')).attr("hidden", true);
          $scope.incomes = [];
          for(var i=0; i<json.length; i++){
            $scope.newItem = {
              id: json[i]["id"],
              name : json[i]["name"],
              ammount : json[i]["ammount"],
            };
            $scope.incomes.push($scope.newItem);
          }
        }
        else if(res.status !== 200)
        {
          angular.element(document.getElementById('nothing-message-incomes')).attr("hidden", false);
          angular.element(document.getElementById('tableContainer-incomes')).attr("hidden", true);
          angular.element(document.getElementById('addButtonContainer-incomes')).attr("hidden", false);
        }
      }).catch(function (error){
          angular.element(document.getElementById('nothing-message-incomes')).attr("hidden", false);
          angular.element(document.getElementById('tableContainer-incomes')).attr("hidden", true);
          angular.element(document.getElementById('addButtonContainer-incomes')).attr("hidden", false);  
      });
    };
  });
