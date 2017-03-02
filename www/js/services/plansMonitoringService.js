angular.module('evolveLite')
  .factory('plansMonitoringService', function(utils, $http){
    var ctrl = this;
    var plansMonitoringObj = {};
    var deferred = $q.defer();

    plansMonitoringObj.getPlanDetails = function () {
      $http.get('/qm-reporting/monitor/plans', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + utils.token
        }
      })
        .then(function success(response) {
          deferred.resolve(response);
        }, function failure(reason) {
          $log.debug('cannot get getPlanDetails. reason: ', reason);
          deferred.reject(reason);
        });
      return deferred.promise;
    };

    return plansMonitoring;
  });
