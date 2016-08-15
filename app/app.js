'use strict';

var myApp = angular.module('myApp', ['ngRoute']) // you must inject the ngRoute (included as a separate js-file)
    .config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
        $routeProvider.
        when('/', {
          templateUrl: 'views/index.html'
        }).
        when('/pubs', {
          templateUrl: 'views/pub-list.html',
          controller: 'PubListController',
          controllerAs: 'pubs' // players could be seen as an instance of the controller, use it in the view!
        }).
        when('/pub/:id', {
          templateUrl: 'views/pub-detail.html',
          controller: 'PubDetailController',
          controllerAs: 'pub'
        }).
        otherwise({
          redirectTo: '/'
        });
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
      }]);