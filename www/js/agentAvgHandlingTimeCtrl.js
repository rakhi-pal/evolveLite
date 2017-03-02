angular.module('evolveLite')
  .controller('agentAvgHandlingTimeCtrl', function ($scope, $filter, utils) {

    $scope.agentGroupData = utils.agentData;

    $scope.getAgentAvgHandlingTime = function (obj) {
      if(angular.isDefined(obj)) {
        return utils.convertSecToMinFormat(obj.agentAvgHandlingTime);
      }
    };

    $scope.getAgentAvgHandlingTime();
  });
