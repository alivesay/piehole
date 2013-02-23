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
      scope: { count: '=' },
      
      compile: function(tElement, tAttrs) {
        return {
          post: function postLink(scope, element, attrs) {
            var content = element.children();
            
            for (var i = 1; i < scope.count; i++) {
              var nContent = content.clone();
              nContent.addClass('n' + i);
              element.append(nContent);
            }
            
            content.addClass('n0');
          }
        }
      }
    };
  });
  
  
