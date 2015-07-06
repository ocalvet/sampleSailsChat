(function() {

  'use strict';

  angular.module('chatApp')
    .controller('ChatCtrl', function($http, $log, $scope, host, chatService) {
      
      $scope.title = "Sample Chat";
      $scope.predicate = "-id";
      $scope.reverse = false;
      
      // Get the list of rooms
      chatService.getRoomList()
        .then(function(rooms) {
          $scope.chatRooms = rooms;
        }, function(error) {
          $log.error(error);
        });
      
      // save list of chats
      $scope.chatList = [];
      $scope.getAllchat = function() {
        io.socket.get('/chat/addconv', function(data) {
          $log.info("creation data", data);
        });

        $http.get(host + '/chat')
          .success(function(data) {
            data.forEach(function(chatEntry) {
              chatEntry.cls = chatEntry.user === $scope.chatUser ? "current-user" : "chat-user";
            })
            $scope.chatList = data;
            $log.info(data);
          });
      };

      // $scope.getAllchat();

      $scope.chatUser = "calvetBot";

      $scope.message = "";

      io.socket.on('chat', function(obj) {

        if (obj.verb === 'created') {
          $log.info(obj);
          obj.data.cls = obj.data.user === $scope.chatUser ? "current-user" : "chat-user";
          $scope.chatList.push(obj.data);
          $scope.$digest();
        }
      
      });

      $scope.sendMessage = function() {
        $log.info($scope.message);
        io.socket.post('/chat/sendmessage/', { user: $scope.chatUser, message: $scope.message });
        $scope.message = "";
      }

      $scope.addRoom = function() {
        $log.info("Add room called");
      }
    })

})();
