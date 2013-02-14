'use strict';

angular.module('pieholeApp.directives')
  .directive('uiRating', function () {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      
      scope: { currentValue: '@',
               maxValue:     '=' },
  
      template: '<div class="ui-rating">' +
                  '<span class="ui-rating-star-container">' +
                    '<data-ph-ntimes count="5">' +
                      '<span data-ng-transclude class="ui-rating-star" />' +
                    '</data-ph-ntimes>' +
                  '</span>' +
                '</div>',
      
      link: function postLink(scope, element, attrs, controller) {

        var setRatingViewByIndex = function(index) {
          element.find('.ui-rating-star').each(function(i, el) {
            angular.element(el).toggleClass('empty', (i > index));
          });
        };
        
        var setRatingViewByElement = function(el) {
          setRatingViewByIndex(angular.element(el).index());
        };
        
        var setRatingView = function(value) {
          setRatingViewByIndex(value - 1);
        }
        
        element.find('.ui-rating-star').each(function(i, el) {
          angular.element(el).bind('mouseover', function(event) {
            setRatingViewByElement(event.target);
          });
          
          angular.element(el).bind('mouseleave', function(event){
            setRatingView(scope.currentValue);
          });
          
          angular.element(el).bind('click', function(event) {
            attrs.$set('currentValue', angular.element(event.target).index() + 1);
          });
        });
        
        attrs.$observe('currentValue', function(value) {
          if (value)
            setRatingView(value);
        });
            
      }
    };
  });