angular.module('evolveLite')
  .controller('agentFirstTimeHandlingCtrl', function ($scope, utils) {
    $scope.getAgentGroupData = function () {
      return utils.agentData;
    };

    $scope.getAgentAvgFTR = function (obj) {
      if(angular.isDefined(obj)) {
        var avgFTH = Math.round((obj.agentTotalFTH / obj.agentInteraction.length) * 100);
        return avgFTH;
      }
    };

    $scope.getAgentAvgFTR();
  });
