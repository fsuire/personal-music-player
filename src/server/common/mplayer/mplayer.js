(function() {
  'use strict';

  //////////
  // mkfifo /home/fred/fifo/mplayer-control
  /////
  // mplayer -input cmdlist
  //////////

  module.exports = mplayer;

  mplayer['@singleton'] = true;
  mplayer['@require'] = ['child_process', 'common/socketIo/socketIo'];

  function mplayer(childProcess, socketIo) {

    var player = null;
    var interval = null;
    var status = {
      pause: true,
      volume: 100,
      meta: {
        title: null,
        duration: 0,
        timePosition: 0
      }
    };

    socketIo
      .of('/mplayer')
      .on('connection', addNewSocket);

    ////////////////

    function addNewSocket(socket) {

      socket.on('play', onPlay);
      socket.on('pause', onPause);
      socket.on('volume', onVolume);

      socket.emit('mplayer.status', status);

      ////////////////

      function onPlay() {
        if(player) {
          onPause();
          return;
        }

        player = childProcess.spawn('mplayer', [
          '-slave',
          '/data/Musique/Amy Winehouse/Back to Black/01 Rehab.mp3'
        ]);


        player.on('exit', function (exitCode) {
          console.log("Child exited with code: " + exitCode);
          player = null;
        });

        player.stdout.on('data', function (data) {
          data = data.toString();
          console.log(data);
          status.meta.title = _seekInputAnswer('ANS_META_TITLE');
          status.meta.duration = _seekInputAnswer('ANS_LENGTH');
          status.meta.timePosition = _seekInputAnswer('ANS_TIME_POSITION');
          socketIo.of('/mplayer').emit('mplayer.status', status);

          function _seekInputAnswer(what) {
            var regexp = new RegExp(what + "='?(.+[^']?)'?\n?");
            var response = data.match(regexp);
            return (response) ? response[1] : null;
          };
        });

        player.stderr.on('data', function (data) {
          //console.log('There was an error: ' + data);
        });

        player.stdin.setEncoding('utf-8');
        player.stdin.write('get_meta_title\n');
        player.stdin.write('get_time_length\n');
        _togglePause()

        socketIo.of('/mplayer').emit('mplayer.status', status);
      }

      function onPause() {
        if(player) {
          player.stdin.write('pause\n');
        }
        _togglePause()
        socketIo.of('/mplayer').emit('mplayer.status', status);
      }

      function _togglePause() {
        status.pause = !status.pause;
        if(status.pause) {
          clearInterval(interval);
        } else {
          interval = setInterval(onInterval, 100);
        }
      }

      function onInterval() {
        if(player) {
          player.stdin.write('get_time_pos\n');
        } else {
          _togglePause();
        }
      }

      function onVolume(volume) {
        if(player) {
          player.stdin.write('set_property volume ' + volume + '\n');
        }
        status.volume = volume;
        socket.broadcast.emit('mplayer.status', status);
      }
    }

  }

})();
