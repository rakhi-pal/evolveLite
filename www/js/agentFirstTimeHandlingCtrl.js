angular.module('evolveLite')
  .controller('agentFirstTimeHandlingCtrl', function ($scope, utils) {
    $scope.agentGroupData = utils.agentData;
  });
