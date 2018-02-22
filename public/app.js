angular.module('todoApp', []).controller('TodoListController', function($scope, $http) {
  const endpointA = '/calcA';
  const endpointB = '/calcB';

  $scope.result = 'value not yet calculated';

  $scope.valueA;
  $scope.valueB;

  $scope.trigger = function() {
    $scope.result = 'getting the first value..';

    $http.get(endpointA).then(function(res){
      var result = parseInt(res.data);

      if(result === NaN) {
        $scope.result = 'there was an err with your request, contact support';
        return;
      }

      $scope.valueA = result;

      $scope.result = 'Obtained the first value, getting the second value';

      getSecondValueThenCalc();
    },
      processErr
    );
  }

  function getSecondValueThenCalc() {
    $http.get(endpointB).then(function(res){
      var result = parseInt(res.data);

      if(result === NaN) {
        $scope.result = 'there was an err with your request, contact support';
        return;
      }

      $scope.valueB = result;
      
      $scope.result = 'Obtained the second value, calculating';

      calc($scope.valueA, $scope.valueB);
    }, processErr);    
  }

  function calc(a, b) {
    $scope.result = a + b;
  }

  function processErr() {
    $scope.val = "There was an err with your request, please contact support!"
  }
});
