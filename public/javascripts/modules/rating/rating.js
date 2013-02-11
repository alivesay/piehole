'use strict';

// should this have it's own controller?

angular.module('pieholeApp.directives')
  .directive('uiRating', function () {
    return {
      restrict: 'E',
      replace: true,
      
      scope: { currentValue: '=currentValue',
               maxValue:     '=maxValue' },
               
      template: '<div class="ui-rating">' +
                '  <data-ph-ntimes count="5"><span class="ui-rating-star">☆</span></data>' +
                '</div>',
                
      link: function postLink(scope, element, attrs, controller) {
        element.children().each(function(i) {
          $(this).toggleClass('empty', (i > scope.currentValue));
        });
      }
    };
  });