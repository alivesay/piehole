'use strict';

angular.module('pieholeApp.directives')
  .directive('uiRating', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="ui-rating">' +
                '  <data-ph-ntimes count="5"><span class="ui-rating-star">☆</span></data>' +
                '</div>',
      link: function postLink(scope, iElement, iAttrs, controller) {
        console.log(iElement);
        iElement.children().each(function() {
        });
      }
    };
  });