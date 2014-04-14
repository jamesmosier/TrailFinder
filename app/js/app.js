'use strict';


// Declare app level module which depends on filters, and services
angular.module('tFinder', [
  'ngRoute',
  'tFinder.filters',
  'tFinder.services',
  'tFinder.directives',
  'tFinder.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/index', {templateUrl: 'index.html', controller: 'HomeCtrl'});//was MyCtrl1
  $routeProvider.when('/view2', {templateUrl: 'map.html', controller: 'MapCtrl'});//was MyCtrl2
  $routeProvider.otherwise({redirectTo: '/index'});
}]);
