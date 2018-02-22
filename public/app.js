angular.module('SMS', []).controller('mainController', function($scope, $http) {
  const endpointA = '/calcA';
  const endpointB = '/calcB';

  $scope.done = false;
  $scope.result = 'value not yet calculated';

  $scope.valueA;
  $scope.valueB;

  $scope.trigger = function() {
    $scope.done = false;
    $scope.result = 'getting the first value..';

    $http.get(endpointA).then(function(res){
      var result = parseInt(res.data);

      if(result === NaN) {
        $scope.result = 'there was an err with your request, contact support';
        return;
      }

      $scope.valueA = result;

      $scope.result = 'Obtained the first value, getting the second value...';

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
    var sum = a + b;
    $scope.sum = sum;
    var factors = [];
        
    for (var i = 2; i <= sum; i++) {
        while ((sum % i) === 0) {
            factors.push(i);
            sum /= i;
        }
    } 

    $scope.result = factors.join(', ');

    $scope.firstValue = $scope.valueA;
    $scope.secondValue = $scope.valueB;
    $scope.done = true;
  }

  function processErr() {
    $scope.val = "There was an err with your request, please contact support!"
  }
});
