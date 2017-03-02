angular.module('evolveLite.plan', [])
  .controller('planMonitoringCtrl', function($scope, $ionicModal, $timeout, $http, utils) {

    // Form data for the login modal
    $scope.planMonitoringData = {};

    $scope.loadPlans = function() {
      $http.get('/qm-reporting/monitor/plans', {
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