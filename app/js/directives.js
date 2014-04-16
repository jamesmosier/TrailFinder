'use strict';

/* Directives */


angular.module('tFinder.directives', []).
  // directive('appVersion', ['version', function(version) {
  //   return function(scope, elm, attrs) {
  //     elm.text(version);
  //   };
  directive('tfinderMap', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).tfindermap(scope.$eval(attrs.tfinderMap));
        }
    };
  });
