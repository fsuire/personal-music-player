(function() {
  'use strict';

  module.exports = socketIo;

  socketIo['@singleton'] = true;
  socketIo['@require'] = ['socket.io', 'server', 'service/socketEventBus'];

  function socketIo(socketIo, server, socketEventBus) {

    var io = socketIo(server);

    io.on('connection', function(socket){
      socketEventBus.emit('add', socket);
      console.log('a user connected');

      socket.on('disconnect', function(){
        console.log('user disconnected');
        socketEventBus.emit('remove', socket);
      });

    });

    return io;
  }

})();
