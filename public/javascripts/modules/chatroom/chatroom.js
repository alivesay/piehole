'use strict';

angular.module('pieholeApp.directives')
  .directive('uiChatroom', function () {
    return {
      restrict: 'E',
      replace: true,

      scope: { messages: '=',
               input: '=',
               username: '=',
               onSubmit: '=' },

      controller: function($scope) {
        $scope.getMessageClasses = function(message) {
          return { 'chatroom-message-list-alert': message.source == 'chatroom',
                   'chatroom-message-list-directed': message.text.indexOf($scope.username) !== -1 };
        };
      },

      template: '<div>' +
                  '<div class="chatroom-message-list">' +
                    '<ui-message-list data-messages="messages" ' +
                      'data-get-message-classes="getMessageClasses" ' +
                      'data-auto-scroll="true" ' +
                      'data-fade-in="true" ' +
                      'data-timestamp-format="HH:mm">' +
                  '</div>' +
                  '<div class="chatroom-input-box">' +
                    '<form class="form-inline" data-ng-submit="onSubmit()">' +
                      '<fieldset>' +
                        '<input data-ng-model="input" type="text" class="chatroom-input-box-text" placeholder="Enter text here to chat">' +
                      '</fieldset>' +
                    '</form>' +
                  '</div>' +
                '</div>'
    };


  });

