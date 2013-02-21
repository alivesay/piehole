'use strict';

angular.module('pieholeApp.directives')
  .directive('uiRating', function () {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,

      scope: { ngModel: '=',
               maxValue: '=' },
  
      template: '<div>' +
                  '<div class="ui-rating">' +
                    '<span class="ui-rating-star-container">' +
                      '<data-ph-ntimes count="maxValue">' +
                        '<span data-ng-transclude class="ui-rating-star" />' +
                      '</data-ph-ntimes>' +
                    '</span>' +
                  '</div>' +
                '</div>',
                    
      link: function postLink(scope, element, attrs, controller) {
        var setRatingViewByIndex = function(index) {
          element.find('.ui-rating-star').each(function(i, el) {
            angular.element(el).toggleClass('empty', (i > index));
            angular.element(el).toggleClass('full', (index === scope.maxValue - 1 || scope.ngModel === scope.maxValue));
          });
        };
        
        var setRatingViewByElement = function(el) {
          setRatingViewByIndex(angular.element(el).index());
        };

          var setRatingView = function(value) {
              setRatingViewByIndex(value - 1);
          };
        
        element.find('.ui-rating-star').each(function(i, el) {
          angular.element(el).bind('mouseover', function(event) {
            setRatingViewByElement(event.target);
          });
          
          angular.element(el).bind('mouseleave', function(){
            setRatingView(scope.ngModel);
          });
          
          angular.element(el).bind('mousedown', function(event) {
            scope.$apply(function() {
              scope.ngModel = angular.element(event.target).index() + 1;
            });
          });          
        });
        
        scope.$watch('ngModel', function(value) {
          if (value)
            setRatingView(value);
        });
        
        setRatingView(scope.ngModel);
      }
    };
  });
