angular.module('evolveLite')

  .controller('appCtrl', function ($scope, $ionicModal, $timeout, utils, $http) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
      if (!utils.token) {
        $scope.login();
      }
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      $http.post('/public/user/login', $scope.loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          utils.userInfo = response.data.user;
          utils.token = response.data.token;
          $scope.getKpiData();
          $scope.closeLogin();
        });
    };

    $scope.getKpiData = function () {
      var searchQueryPayload = {
        "from": 0,
        "size": 9999,
        "query": "*",
        "sortClauses": [{"field": "gmtStartTime", "order": "desc"}]
      };

      $http.post('/searchapi/query', searchQueryPayload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + utils.token
        }
      })
        .then(function (response) {
          utils.totalInteractionRecords = response.data.total;
          utils.searchQueryResult = response.data.results;
          var totalHandlingTime = 0;
          var totalFirstTimeResolution = 0;

          angular.forEach(utils.searchQueryResult, function (obj, key) {
            obj.firstTimeResolution = Math.floor((Math.random() * 2));
            totalFirstTimeResolution = totalFirstTimeResolution + obj.firstTimeResolution;
            totalHandlingTime = totalHandlingTime + parseInt(obj.duration);
          });

          utils.avgHandlingTime = Math.round(totalHandlingTime / utils.totalInteractionRecords);
          utils.avgFTR = Math.floor((totalFirstTimeResolution / utils.totalInteractionRecords) * 100);
        });
    };
  });
