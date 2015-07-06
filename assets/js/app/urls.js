(function() {

  'use strict';

  angular.module('chatApp')
    .factory('urls', function() {
      return {
        getRooms: '/chat/getRoomList',
        joinRoom: '/chat/joinRoom',
        sendMessage: '/chat/sendMessage'
      };
    });

})();
