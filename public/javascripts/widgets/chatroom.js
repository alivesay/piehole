'use strict';

angular.module('pieholeApp.widgets', [])
  .directive('uiChatroom', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: false,
      templateUrl: 'chatroom.html'
    };
  });

