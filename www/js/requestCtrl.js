angular.module('evolveLite.request', [])
  .controller('requestCtrl', function($scope, $http, utils) {

    $scope.requestData = [];
    $scope.requestData = [ {
    "timeOffRequestUuid" : "11e6ff42-edfe-9df0-8b96-0242ac110005",
    "userUuid" : "11e6d3f7-0018-8a90-8b35-0242ac110004",
    "userName" : "Ashish Gabhane",
    "userEmailAddress" : "ashish.gabhane@nice.com",
    "activityCodeUuid" : "6dfe0267-d3f8-1100-0000-000000000000",
    "activityCodeTitle" : "Unpaid Time Off",
    "requestCreationDate" : "2017-03-02T12:22:40.000+0000",
    "userComment" : null,
    "timeOffStartDate" : "2017-03-02T00:00:00.000+0000",
    "timeOffEndDate" : "2017-03-03T00:00:00.000+0000",
    "requestStatus" : "APPROVED",
    "requestStatusUpdaterUuid" : "11e6d3f7-0018-8a90-8b35-0242ac110004",
    "requestStatusUpdaterName" : "Ashish Gabhane",
    "requestStatusUpdaterEmailAddress" : "ashish.gabhane@nice.com",
    "statusUpdateComment" : null,
    "singleDay" : false
  }, {
    "timeOffRequestUuid" : "11e6ff7a-a688-e060-aaf0-0242ac110006",
    "userUuid" : "11e6d3f7-0018-8a90-8b35-0242ac110004",
    "userName" : "Ashish Gabhane",
    "userEmailAddress" : "ashish.gabhane@nice.com",
    "activityCodeUuid" : "6dfdee02-d3f8-1100-0000-000000000000",
    "activityCodeTitle" : "Paid Time Off",
    "requestCreationDate" : "2017-03-02T19:01:33.000+0000",
    "userComment" : null,
    "timeOffStartDate" : "2017-03-04T00:00:00.000+0000",
    "timeOffEndDate" : "2017-03-04T00:00:00.000+0000",
    "requestStatus" : "DECLINED",
    "requestStatusUpdaterUuid" : "11e6d3f7-0018-8a90-8b35-0242ac110004",
    "requestStatusUpdaterName" : "Ashish Gabhane",
    "requestStatusUpdaterEmailAddress" : "ashish.gabhane@nice.com",
    "statusUpdateComment" : null,
    "singleDay" : true
  }, {
    "timeOffRequestUuid" : "11e6ff7a-aca6-4690-aaf0-0242ac110006",
    "userUuid" : "11e6d3f7-0018-8a90-8b35-0242ac110004",
    "userName" : "Ashish Gabhane",
    "userEmailAddress" : "ashish.gabhane@nice.com",
    "activityCodeUuid" : "6dfdee02-d3f8-1100-0000-000000000000",
    "activityCodeTitle" : "Paid Time Off",
    "requestCreationDate" : "2017-03-02T19:01:43.000+0000",
    "userComment" : null,
    "timeOffStartDate" : "2017-03-15T00:00:00.000+0000",
    "timeOffEndDate" : "2017-03-16T00:00:00.000+0000",
    "requestStatus" : "PENDING",
    "requestStatusUpdaterUuid" : null,
    "requestStatusUpdaterName" : null,
    "requestStatusUpdaterEmailAddress" : null,
    "statusUpdateComment" : null,
    "singleDay" : false
  } ];

    $scope.loadTimeOffRequest = function() {
      $http.get('/schedules/timeoffrequests', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + utils.token
        }
      })
        .then(function(response) {
          $scope.requestData = response.data.timeOffRequests;
        });
    };

    $scope.loadTimeOffRequest();
  });
