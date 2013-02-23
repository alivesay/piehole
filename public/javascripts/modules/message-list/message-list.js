'use strict';

angular.module('pieholeApp.directives')
  .directive('uiMessageList', function () {
    return {
      restrict: 'E',
      replace: true,

      scope: { ngModel: '=',
               messageClasses: '@',
               autoScroll: '=',
               autoScrollSpeed: '=',
               fadeIn: '=',
               fadeInSpeed: '=' },

      template: '<div>' +
                  '<div class="ui-message-list">' +
                    '<ul>' +
                      '<li data-ng-repeat="message in ngModel" data-ng-class="{{messageClasses}}">' +
            //    '<span class="ui-message-list-timestamp">{{ displayTime timestamp }}</span>' +
                        '<span class="ui-message-list-source">{{ message.source }}</span>' +
                        '<span class="ui-message-list-text">{{ message.text }}</span>' +
                      '</li>' +
                    '</ul>' +
                  '</div>' +
                '</div>',

      link: function postLink(scope, element, attrs, controller) {
        scope.$watch('ngModel', function() {
          var uiMessageListDiv = element.find('.ui-message-list:first');

          if (scope.autoScroll === true) {
            uiMessageListDiv.stop().animate({ scrollTop: uiMessageListDiv.prop('scrollHeight') },
                                            parseInt(scope.autoScrollSpeed || 500, 10));
          }

          if (scope.fadeIn === true) {
            var lastMessageLi = uiMessageListDiv.find('li:last');
              if (lastMessageLi !== undefined) {
                lastMessageLi.stop().animate({ opacity: 1 }, parseInt(scope.fadeInSpeed || 500, 10));
              }
            }
          }, true);
        }
      };
    });