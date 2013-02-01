'use strict';

function pieholeCtrl($scope, socket) {
  
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
      user: 'chatroom',
      test: 'User ' + data.name + ' has joined.'
    });
    $scope.users.push(data.name);
  });

  socket.on('user:left', function (data) {
    $scope.messages.push({
      user: 'chatroom',
      text: 'User ' + data.name + ' has left.'
    });
    var i, user;
    for (i = 0; i < $scope.users.length; i++) {
      user = $scope.users[i];
      if (user === data.name) {
        $scope.users.splice(i, 1);
        break;
      }
    }
  });

  $scope.messages = [];

  $scope.sendMessage = function() {
    socket.emit('send:message', {
      message: $scope.message
    });

    $scope.messages.push({
      user: $scope.name,
      text: $scope.message
    });

    $scope.message = '';
  };

}