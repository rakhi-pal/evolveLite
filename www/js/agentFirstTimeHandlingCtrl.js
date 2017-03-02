angular.module('evolveLite')
  .controller('agentFirstTimeHandlingCtrl', function ($scope, utils) {
    $scope.agentGroupData = utils.agentData;

    $scope.getFTR = function () {
      if(utils.avgFTR) {
        return utils.avgFTR;
      }
    }
  });
