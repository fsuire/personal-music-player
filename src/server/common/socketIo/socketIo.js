(function() {
  'use strict';

  module.exports = socketIo;

  socketIo['@singleton'] = true;
  socketIo['@require'] = ['socket.io', 'server'];

  function socketIo(socketIo, server) {

    var io = socketIo(server);

    return io;
  }

})();
