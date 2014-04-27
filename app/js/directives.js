'use strict';

/* Directives */


angular.module('tFinder.directives', []).

directive('tfinderMap', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      attrs.$observe("tfinderMap",function(value){
         if (value) {
           $(element).tfindermap(scope.$eval(attrs.tfinderMap));
         }
      })

     scope.moreResults = function(){
          $(element).tfindermap({
            queryLimit: 50,
            removeData: true
          });
     };


    }
  };
});