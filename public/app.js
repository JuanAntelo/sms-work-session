      angular.module('todoApp', []).controller('TodoListController', function($http) {
        var endpointA = '/calcA';
        var endpointB = '/calcB';

        $http.get(endpointA).then(function(response){
          processEndpoint1(response.data);
        }, 
          processEndpointError
        );

        function processEndpoint1(data) {
          console.log('processEndpoint1 : ' + data);

          $http.get(endpointB).then(function(response){
            processEndpoint2(response.data)
          }, processEndpointError);
        }

        function processEndpoint2(data) {
          console.log('processEndpoint2 : ' + data);
        }

        function processEndpointError(response) {
          console.log('error with an api request');
        }

/*
        var todoList = this;
        todoList.todos = [
          {text:'learn AngularJS', done:true},
          {text:'build an AngularJS app', done:false}
        ];
 
        todoList.addTodo = function() {
          todoList.todos.push({text:todoList.todoText, done:false});
          todoList.todoText = '';
        };
 
        todoList.remaining = function() {
          var count = 0;
          angular.forEach(todoList.todos, function(todo) {
            count += todo.done ? 0 : 1;
          });
          return count;
        };
*/

      });