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
    $scope.user = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
      /*if (!utils.token) {
        $scope.login();
      }*/
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
      $scope.loginData.password = '';
    };

    $scope.logout = function () {
      utils.token = null;
      utils.userInfo = null;
      $scope.login();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      $http.post('/public/user/login', $scope.loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          $scope.loginError = false;
          utils.userInfo = response.data.user;
          utils.token = response.data.token;
          console.log('Login jalarre....!!!!!:)');
          $scope.user.name = response.data.user.fullName;
          $scope.user.email = response.data.user.emailAddress;
          $scope.getKpiData();
        }, function (response) {
          $scope.loginError = true;
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
            if ((obj.userIds[0])) {
              if (utils.agentData[obj.userIds[0]]) {
                utils.agentData[obj.userIds[0]].agentTotalHandingTime = utils.agentData[obj.userIds[0]].agentTotalHandingTime + parseInt(obj.duration);
                utils.agentData[obj.userIds[0]].agentTotalFTH = utils.agentData[obj.userIds[0]].agentTotalFTH + parseInt(obj.firstTimeResolution);
                utils.agentData[obj.userIds[0]].agentInteraction.push(obj);
              } else {
                utils.agentData[obj.userIds[0]] = {};
                utils.agentData[obj.userIds[0]].agentName = obj.agentName_sort;
                utils.agentData[obj.userIds[0]].agentInteraction = [];
                utils.agentData[obj.userIds[0]].agentTotalHandingTime = parseInt(obj.duration);
                utils.agentData[obj.userIds[0]].agentTotalFTH = parseInt(obj.firstTimeResolution);
                utils.agentData[obj.userIds[0]].agentInteraction.push(obj);
              }
            }
          });

          utils.avgHandlingTime = Math.round(totalHandlingTime / utils.totalInteractionRecords);
          utils.avgFTR = Math.floor((totalFirstTimeResolution / utils.totalInteractionRecords) * 100);

          angular.forEach(utils.agentData, function (obj, key) {
            obj.agentAvgHandlingTime = Math.round(obj.agentTotalHandingTime / obj.agentInteraction.length);
            obj.needAlertForAHT = obj.showWarningForAHT = obj.agentAvgHandlingTime > utils.avgHandlingTime;

            obj.agentAvgFTH = Math.round((obj.agentTotalFTH / obj.agentInteraction.length) * 100);
            obj.needAlertForFTH = obj.showWarningForFTH = obj.agentAvgFTH < utils.avgFTR;
          });
          $scope.closeLogin();
        }, function (reason) {
          $scope.closeLogin();
        });
    };
  });
