angular.module('evolveLite.search', [])
  .controller('searchCtrl', function ($scope, $http, utils) {

    $scope.searchParam = {
      param: ''
    };
    $scope.searchData = [];

    $scope.getSearchData = function () {
      return $scope.searchData;
    };

    $scope.getCallDuration = function (duration) {
      return utils.convertSecToMinFormat(duration);
    };

    $scope.searchRequest = function () {
      var searchQueryPayload = {
        "from": 0,
        "size": 9999,
        "query": $scope.searchParam.param != '' ? $scope.searchParam.param : '*',
        "sortClauses": [{"field": "gmtStartTime", "order": "desc"}]
      };
      $http.post('/searchapi/query', searchQueryPayload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + utils.token
        }
      })
        .then(function (response) {
          $scope.searchData = response.data.results;
        });
    };

    $scope.searchRequest();

  });
