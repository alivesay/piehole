'use strict';

function pieholeCtrl($scope, $rootScope, socket) {
  
  socket.on('init', function (data) {
    $scope.name = data.name;
    $scope.users = data.users;
  });

  socket.on('send:name', function (data) {
    $scope.name = data.name;
  });

  socket.on('send:message', function (message) {
    $scope.messages.push(message);
  });

  socket.on('user:join', function (data) {
    $scope.messages.push({
      source: 'chatroom',
      text: 'User ' + data.name + ' has joined.',
      timestamp: Date.now()
    });
    $scope.users.push(data.name);
  });

  socket.on('user:left', function (data) {
    $scope.messages.push({
      source: 'chatroom',
      text: 'User ' + data.name + ' has left.',
      timestamp: Date.now()
    });
    $scope.users.remove(function(el) { return el === data.name; });
  });

  $scope.messages = [];

  $scope.sendMessage = function() {
    socket.emit('send:message', {
      message: $scope.message
    });

    $scope.messages.push({
      source: $scope.name,
      text: $scope.message,
      timestamp: Date.now()
    });

    $scope.message = '';
  };

  $scope.data = {};
  $scope.data.rating_bound = 0;
  $scope.data.rating_standalone = 0;
}
