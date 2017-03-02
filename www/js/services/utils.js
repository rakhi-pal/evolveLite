angular.module('evolveLite')
  .factory('utils', function () {
    var utilsObj = {};
    utilsObj.userInfo = null;
    utilsObj.token = null;
    utilsObj.totalInteractionRecords = 0;
    utilsObj.avgHandlingTime = 0;
    utilsObj.avgFTR = 0;
    utilsObj.searchQueryResult = null;
    utilsObj.agentData = {};

    utilsObj.convertSecToMinFormat = function (input) {
      var minutes = parseInt(input / 60, 10);
      var seconds = input % 60;
      return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds ? seconds + ' min' : '00 min');
    };

    return utilsObj;
  });
