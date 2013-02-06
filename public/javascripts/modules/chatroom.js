'use strict';

angular.module('pieholeApp.directives', [])
  .directive('uiChatroom', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: false,
      templateUrl: 'chatroom.html'
    };
  });

