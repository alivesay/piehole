'use strict';

angular.module('pieholeApp.directives', [])
  .directive('appVersion', ['version', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  
  .directive('phNtimes', function () {
    
    return {
      restrict: 'E',
      replace: true,
      compile: function(tElement, tAttrs) {
        var content = tElement.children();
        
        for (var i = 1; i < tAttrs.count; i++) {
          var nContent = content.clone();
          nContent.addClass('n' + i);
          tElement.append(nContent);
        }
        
        content.addClass('n0');
        tElement.replaceWith(tElement.children());
      }
    };
  });
  
  
