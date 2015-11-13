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
    var status = {};

    socketIo
      .of('/mplayer')
      .on('connection', addNewSocket);

    _init();

    ////////////////

    function _init() {
      player = null;
      interval = null;
      status = {
        pause: true,
        volume: 100,
        meta: {
          title: null,
          duration: 0,
          timePosition: 0
        },
        playlist: []
      };
    }

    ////////////////

    function addNewSocket(socket) {

      socket.on('play', onPlay);
      socket.on('pause', onPause);
      socket.on('volume', onVolume);
      socket.on('position', onPosition);
      socket.on('addToPlaylist', onAddToPlaylist);

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
          _togglePause('exit');
          _init();
          socketIo.of('/mplayer').emit('mplayer.status', status);
        });

        player.stdout.on('data', function (data) {
          data = data.toString();
          //console.log(data);
          status.meta.title = _seekInputAnswer('ANS_META_TITLE') || status.meta.title;
          status.meta.duration = _seekInputAnswer('ANS_LENGTH') || status.meta.duration;
          status.meta.timePosition = _seekInputAnswer('ANS_TIME_POSITION') || status.meta.timePosition;
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
        _togglePause('onplay');

        socketIo.of('/mplayer').emit('mplayer.status', status);
      }

      function onPause() {
        if(player) {
          player.stdin.write('pause\n');
        }
        _togglePause('onpause');
        socketIo.of('/mplayer').emit('mplayer.status', status);
      }

      function onInterval() {
        if(player) {
          player.stdin.write('get_time_pos\n');
        }
      }

      function onVolume(volume) {
        if(player) {
          player.stdin.write('set_property volume ' + volume + '\n');
        }
        status.volume = volume;
        socket.broadcast.emit('mplayer.status', status);
      }

      function onPosition(position) {
        if(player) {
          player.stdin.write('set_property time_pos ' + position + '\n');
        }
        status.meta.timePosition = position;
        socket.broadcast.emit('mplayer.status', status);
      }

      function onAddToPlaylist(id) {
        if(player) {
          //player.stdin.write('set_property time_pos ' + position + '\n');
        }
        status.playlist.push(id);
        console.log('!!!!!!!!!!', id);
        socket.broadcast.emit('mplayer.status', status);
      }

      ////////////////

      function _togglePause(from) {
        console.log('Toggle pause', from || '', status.pause, !status.pause);
        status.pause = !status.pause;
        if(status.pause) {
          clearInterval(interval);
        } else {
          interval = setInterval(onInterval, 100);
        }
      }

    }

  }

})();
