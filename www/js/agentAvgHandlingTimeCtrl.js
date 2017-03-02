angular.module('evolveLite')
  .controller('agentAvgHandlingTimeCtrl', function ($scope, $filter, utils) {
    $scope.getAgentGroupData = function () {
      return utils.agentData;
    };

    $scope.getAgentAvgHandlingTime = function (obj) {
      if(angular.isDefined(obj)) {
        var avgTime = Math.round(obj.agentTotalHandingTime / obj.agentInteraction.length);
        return utils.convertSecToMinFormat(avgTime);
      }
    };

    $scope.getAgentAvgHandlingTime();
  });
