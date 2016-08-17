'use strict';

var myApp = angular.module('myApp', ['ngRoute','LocalStorageModule','ngMap']) // you must inject the ngRoute (included as a separate js-file)

    .config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
        $routeProvider.
        when('/', {
          templateUrl: 'views/index.html'
        }).
        when('/pubs', {
          templateUrl: 'views/pub-list.html',
          controller: 'PubListController',
          controllerAs: 'pubs' // pubs could be seen as an instance of the controller, use it in the view!
        }).
        when('/:id', {
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
      }])
          .config(function (localStorageServiceProvider) {
            // The module give me some stuff to configure
            localStorageServiceProvider
                .setPrefix('myApp')
                .setStorageType('sessionStorage')
                .setNotify(true, true)
          })
          .constant('API', { // here I also can declare constants
            'key': "newtoken", // bad practice!? Key on client....
            'url': "https://rubyonrails-api-jb223cp.c9users.io/api/v1/", // base url
            'format': 'application/json' // Default representation we want
          })
          .constant('LocalStorageConstants', {
            'pubsKey' : 'p', // just some keys for sessionStorage-keys
            'tagsKey'   : 't'
          });