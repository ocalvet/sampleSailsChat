(function() {

  'use strict';

  angular.module('chatApp')
    .service('chatService', function($q, $log, urls) {
    
      var getRooms = function() {
        var defer = $q.defer();
          
        io.socket.get(urls.getRooms, function(data) {
          $log.info('Rooms', data);
          defer.resolve(data.rooms);
        });

        return defer.promise;
      },

      joinRoom = function(roomName) {
        var defer = $q.defer();


        return defer.promise;
      };

      return {
        getRoomList: getRooms,
        joinRoom: joinRoom,
      }
    });

})();
