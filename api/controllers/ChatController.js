/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  addConv: function (req, res) {
    if (req.isSocket) {
      Chat.watch(req.socket);
      console.log("User subscribed to ", req.socket.id);
    }
  },

  sendMessage: function (req, res) {

    if (req.isSocket) {
      var clientData = req.params.all();

      Chat.create(clientData)
        .exec(function(error, clientData) {
          console.log("client data: ", clientData);
          Chat.publishCreate( { id: clientData.id, message: clientData.message, user: clientData.user });
      });
    }

  },

  joinRoom: function (req, res) {
    
    if (req.isSocket) {
      var roomName = req.param("roomName");
      sails.sockets.join(req.socket, roomName);
      res.json({
        roomName: roomName,
        message: 'Subscribed to room ' + roomName
      });
    }

  },

  getRoomList: function(req, res) {
    
    if (req.isSocket) {
      res.json({
        rooms: sails.sockets.socketRooms(req.socket)
      });
    }

  }
};

