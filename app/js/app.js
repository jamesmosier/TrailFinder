'use strict';


// Declare app level module which depends on filters, and services
angular.module('tFinder', [
  'ngRoute',
  //'tFinder.filters',
  //'tFinder.services',
  'tFinder.directives',
  'tFinder.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {title: 'Trailfinder', templateUrl: 'home.html', controller: 'HomeCtrl'});//was MyCtrl1
  $routeProvider.when('/fav', {title: 'Trailfinder - Favorites', templateUrl: 'fav.html', controller: 'FavCtrl'});//was MyCtrl2
  $routeProvider.when('/map', {title: 'Trailfinder - Map', templateUrl: 'map.html', controller: 'MapCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
}])
.run( [ '$rootScope', '$route', function( $rootScope, $route ){
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);



