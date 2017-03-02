angular.module('evolveLite.plan', [])
  .controller('planMonitoringCtrl', function($scope, $http, utils) {
    $scope.planMonitoringData = {};

    $scope.loadPlans = function() {
      $http.get('https://dev.wfosaas.com/qm-reporting/monitor/plans', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + utils.token
        }
      })
        .then(function(response) {
          $scope.planMonitoringData = response.data.planMonitoringData;
        });
    };

    $scope.loadPlans();
  });
