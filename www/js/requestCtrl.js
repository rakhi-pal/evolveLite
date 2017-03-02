angular.module('evolveLite.request', [])
  .controller('requestCtrl', function($scope, $http, utils) {

    $scope.requestData = [];
    
    $scope.loadTimeOffRequest = function() {
      $http.get('https://dev.wfosaas.com/schedules/timeoffrequests', {
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

    $scope.takeAction = function(request, status) {
      request.requestStatusUpdaterUuid = utils.userInfo.id;
      request.requestStatus = status;
      $http.put('https://dev.wfosaas.com/schedules/timeoffrequests', request, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + utils.token
        }
      })
      .then(function(response) {
        $scope.loadTimeOffRequest();
      });
    };
  });
