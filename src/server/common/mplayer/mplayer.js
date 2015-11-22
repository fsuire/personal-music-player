(function() {
  'use strict';

  //////////
  // mkfifo /home/fred/fifo/mplayer-control
  /////
  // mplayer -input cmdlist
  //////////

  module.exports = mplayer;

  mplayer['@singleton'] = true;
  mplayer['@require'] = ['child_process','lodash', 'common/socketIo/socketIo'];

  function mplayer(childProcess, _, socketIo) {

    var player = null;
    var interval = null;
    var status = {};
    var playlist = [];

    socketIo
      .of('/mplayer')
      .on('connection', addNewSocket);

    _init();

    ////////////////

    function _init() {
      player = null;
      interval = null;
      playlist = [];
      status = {
        pause: true,
        volume: 100,
        timePosition: 0,
        currentTrackIndex: -1
      };
    }

    ////////////////

    function addNewSocket(socket) {

      socket.on('play', onPlay);
      socket.on('pause', onPause);
      socket.on('volume', onVolume);
      socket.on('position', onPosition);
      socket.on('addToPlaylist', onAddToPlaylist);
      socket.on('getPlaylist', onGetPlaylist);

      socket.emit('mplayer.status', status);
      socket.emit('mplayer.playlist', playlist);

      ////////////////

      function onPlay() {
        if(player) {
          onPause();
          return;
        }

        var commandOptions = Array.prototype.concat.call(
          ['-slave'],
          Array.prototype.map.call(playlist, function(track) {
            return 'http://localhost:4000/music/play/' + track.id;
          })
        );
        player = childProcess.spawn('mplayer', commandOptions);

        player.on('exit', function (exitCode) {
          _togglePause();
          _init();
          socketIo.of('/mplayer').emit('mplayer.status', status);
        });

        player.stdout.on('data', function (data) {
          data = data.toString();

          status.timePosition = parseInt(_seekInputAnswer('ANS_TIME_POSITION')) || status.timePosition;
          socketIo.of('/mplayer').emit('mplayer.status', status);

          function _seekInputAnswer(what) {
            var regexp = new RegExp(what + "='?(.+[^']?)'?\n?");
            var response = data.match(regexp);
            return (response) ? response[1] : null;
          };
        });

        player.stderr.on('data', function (data) {
          data = data.toString();
          //console.log(data);
        });

        player.stdin.setEncoding('utf-8');

        status.currentTrackIndex = 0;
        _togglePause();
        socket.emit('mplayer.playlist', playlist);
        socket.emit('mplayer.status', status);
      }

      function onPause() {
        if(player) {
          player.stdin.write('pause\n');
        }
        _togglePause();
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
        status.timePosition = position;
        socket.broadcast.emit('mplayer.status', status);
      }

      function onAddToPlaylist(id) {
        if(player) {
          //player.stdin.write('set_property time_pos ' + position + '\n');
        }
        playlist.push(id);
        socketIo.of('/mplayer').emit('mplayer.playlist', playlist);
      }

      function onGetPlaylist() {
        socket.emit('mplayer.playlist', playlist);
      }

      ////////////////

      function _togglePause() {
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
