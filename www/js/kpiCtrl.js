angular.module('evolveLite')
  .controller('kpiCtrl', function ($scope, utils) {
    $scope.data = {
      header: 'Contact Centre KPI'
    };
    $scope.timeStr = '0';
    $scope.avgFTR = 0;

    $scope.getAvgHandlingTime = function () {
      return utils.convertSecToMinFormat(utils.avgHandlingTime);
    };

    $scope.getAvgFTR = function () {
      return utils.avgFTR;
    };
  });
