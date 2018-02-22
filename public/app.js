      angular.module('todoApp', []).controller('TodoListController', function($scope, $http) {
        $scope.result = 'value not yet calculated';

        $scope.trigger = function() {
          $scope.result = 'calculating..';
          
          setTimeout(function(){
            $scope.result = 33;            
          }, 1000);
        }


        var endpointA = '/calcA';
        var endpointB = '/calcB';

        $http.get(endpointA).then(function(response){
          processEndpoint1(response.data);
        },
          processEndpointError
        );

        function processEndpoint1(endpoint1Data) {
          console.log('processEndpoint1 : ' + endpoint1Data);

          $http.get(endpointB).then(function(endpoint2Data){
            processEndpoint2(endpoint2Data.data)
          }, processEndpointError);
        }

        function processEndpoint2(data) {
          console.log('processEndpoint2 : ' + data);
        }

        function processEndpointError(response) {
          console.log('error with an api request');
        }
      });