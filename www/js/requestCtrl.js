angular.module('evolveLite.plan', [])
  .controller('requestCtrl', function($scope, $ionicModal, $timeout, $http, utils) {

    $scope.requestData = {};

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
