(function() {
  'use strict';

  module.exports = socketIo;

  socketIo['@singleton'] = true;
  socketIo['@require'] = ['socket.io', 'server', 'uid', 'service/socketEventBus'];

  function socketIo(socketIo, server, uid, socketEventBus) {

    var io = socketIo(server);

    io.on('connection', function(socket){
      var id = uid(10);
      socketEventBus.emit('add', id, socket);
      console.log('a user connected', id);

      socket.on('disconnect', function(){
        console.log('user disconnected');
        socketEventBus.emit('remove', id);
      });

    });

    return io;
  }

})();
