angular.module('evolveLite.request', [])
  .controller('requestCtrl', function($scope, $http, utils) {

    $scope.requestData = [];
    
    $scope.loadTimeOffRequest = function() {
      $http.get('/schedules/timeoffrequests', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + utils.token
        }
      })
        .then(function(response) {
          $scope.requestData = response.data.timeOffRequests;
        });
    };

    $scope.loadTimeOffRequest();
  });
