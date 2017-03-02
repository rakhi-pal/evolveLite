// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('evolveLite', ['ionic', 'evolveLite.plan'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'appCtrl'
      })
      .state('app.kpi', {
        url: '/kpi',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'kpiCtrl'
          }
        }
      })
      .state('app.agentAvgHandlingTime', {
        url: '/agentAvgHandlingTime',
        views: {
          'menuContent': {
            templateUrl: 'templates/agentAvgHandlingTime.html',
            controller: 'agentAvgHandlingTimeCtrl'
          }
        }
      })
      .state('app.agentFirstTimeHandling', {
        url: '/agentFirstTimeHandling',
        views: {
          'menuContent': {
            templateUrl: 'templates/agentFirstTimeHandling.html',
            controller: 'agentFirstTimeHandlingCtrl'
          }
        }
      })
      .state('app.ScheduleManager', {
        url: '/scheduleManager',
        views: {
          'menuContent': {
            templateUrl: 'templates/scheduleManager.html',
            controller: 'scheduleManagerCtrl'
          }
        }
      })
      .state('app.PlanMonitoring', {
        url: '/planMonitoring',
        views: {
          'menuContent': {
            templateUrl: 'templates/planMonitoring.html',
            controller: 'planMonitoringCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/kpi');
  });
