'use strict';

/* Directives */


angular.module('tFinder.directives', []).
// directive('appVersion', ['version', function(version) {
//   return function(scope, elm, attrs) {
//     elm.text(version);
//   };
// }]);

// directive('tfinderMap', function($timeout) {     
//   return function (scope, element, attrs, controller) {       
//     $timeout(function(){      
//       console.log('insdie timeout');
//       $(element).tfindermap(scope.$eval(attrs.tfinderMap));
//     });     
//   };   
// });

directive('tfinderMap', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs, $timeout) {
      attrs.$observe("tfinderMap",function(value){
         if (value) {
           $(element).tfindermap(scope.$eval(attrs.tfinderMap));
         }
      })
    }
  };
});