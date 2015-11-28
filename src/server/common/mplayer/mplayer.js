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
    var currentTrackIndex = 0;
    var requestedIndex = null;
    var startThenPause = false;
    var isLoopPlaying = false;
    var isRandomPlaying = false;
    var lastIds = [];

    socketIo
      .of('/mplayer')
      .on('connection', addNewSocket);

    _init();

    ////////////////

    function _init() {
      player = null;
      interval = null;
      playlist = playlist || [];
      status = {
        pause: true,
        volume: status.volume || 100,
        timePosition: 0
      };
    }

    ////////////////

    function addNewSocket(socket) {
      try {
        socket.on('play', onPlay);
        socket.on('pause', onPause);
        socket.on('previous-track', onPreviousTrack);
        socket.on('next-track', onNextTrack);
        socket.on('play-track', onPlayTrack);
        socket.on('volume', onVolume);
        socket.on('position', onPosition);
        socket.on('addToPlaylist', onAddToPlaylist);
        socket.on('getPlaylist', onGetPlaylist);
        socket.on('toggle-loop-playlist', onToggleLoopPlaylist);
        socket.on('toggle-random-playlist', onToggleRandomPlaylist);

        socket.emit('mplayer.status', status);
        socket.emit('mplayer.playlist', playlist);
        socket.emit('mplayer.isLoopPlaying', isLoopPlaying);
        socket.emit('mplayer.isRandomPlaying', isRandomPlaying);
      } catch(error) {
        console.log('ERROR ADD NEW SOCKET');
      }

      ////////////////

      function onPlay() {
        try {
          if(player) {
            onPause();
            return;
          }

          _logPlaylist();
          var commandOptions = ['-slave', 'http://localhost:4000/music/play/' + playlist[currentTrackIndex].id];
          player = childProcess.spawn('mplayer', commandOptions);

          player.on('exit', function (exitCode) {
            try {
              _init();

              if(!_.isNull(requestedIndex)) {
                currentTrackIndex = requestedIndex;
                requestedIndex = null;
              } else {
                currentTrackIndex = _incrementCurrentTrackIndex();
              }

              if(playlist[currentTrackIndex]) {
                onPlay();
              } else {
                currentTrackIndex = 0;
                socketIo.of('/mplayer').emit('mplayer.playlist', playlist, currentTrackIndex);
                socketIo.of('/mplayer').emit('mplayer.status', status);
              }
            } catch(error) {
              console.log('!!mplayer onplay on exit ERROR!!', error);
            }
          });

          player.stdout.on('data', function (data) {
            try {
              data = data.toString();

              status.timePosition = parseInt(_seekInputAnswer('ANS_TIME_POSITION')) || status.timePosition;

              socketIo.of('/mplayer').emit('mplayer.status', status);

              function _seekInputAnswer(what) {
                var regexp = new RegExp(what + "='?(.+[^']?)'?\n?");
                var response = data.match(regexp);
                return (response) ? response[1] : null;
              };
            } catch(error) {
              console.log('!!mplayer onplay on data ERROR!!', error);
            }
          });

          player.stderr.on('data', function (data) {
            data = data.toString();
            //console.log(data);
          });

          player.stdin.setEncoding('utf-8');
          onVolume(status.volume);

          if(startThenPause) {
            status.pause = !status.pause;
            onPause();
          } else {
            _togglePause();
          }
          socketIo.of('/mplayer').emit('mplayer.playlist', playlist, currentTrackIndex);
          socketIo.of('/mplayer').emit('mplayer.status', status);
        } catch(error) {
          console.log('!!mplayer onplay ERROR!!', error);
          _logPlaylist();
          console.log('CURRENT TRACK INDEX ->', currentTrackIndex);
        }

      }

      function onPreviousTrack() {
        try {
          startThenPause = status.pause;
          if(player) {
            requestedIndex = currentTrackIndex - 1;
            _killMplayer();
          } else {
            currentTrackIndex--;
            socketIo.of('/mplayer').emit('mplayer.playlist', playlist, currentTrackIndex);
          }
        } catch(error) {
          console.log('!!mplayer onPreviousTrack ERROR!!', error);
        }
      }

      function onNextTrack() {
        try {
          startThenPause = status.pause;

          var computedIndex = _incrementCurrentTrackIndex();

          if(player) {
            requestedIndex = computedIndex;
            _killMplayer();
          } else {
            currentTrackIndex = computedIndex;
            socketIo.of('/mplayer').emit('mplayer.playlist', playlist, currentTrackIndex);
          }
        } catch(error) {
          console.log('!!mplayer onNextTrack ERROR!!', error);
        }
      }

      function onPlayTrack(trackIndex) {
        try {
          startThenPause = status.pause;
          if(player) {
            requestedIndex = trackIndex;
            _killMplayer();
          } else {
            currentTrackIndex = trackIndex;
            socketIo.of('/mplayer').emit('mplayer.playlist', playlist, currentTrackIndex);
          }
        } catch(error) {
          console.log('!!mplayer onPlayTrack ERROR!!', error);
        }
      }

      function onPause() {
        try {
          if(player) {
            player.stdin.write('pause\n');
          }
          _togglePause();
          socketIo.of('/mplayer').emit('mplayer.status', status);
        } catch(error) {
          console.log('!!mplayer onPause ERROR!!', error);
        }
      }

      function onInterval() {
        try {
          if(player) {
            player.stdin.write('get_time_pos\n');
          }
        } catch(error) {
          console.log('oninterval errror', error);
        }
      }

      function onVolume(volume) {
        try {
          if(player) {
            player.stdin.write('set_property volume ' + volume + '\n');
          }
          status.volume = volume;
          socket.broadcast.emit('mplayer.status', status);
        } catch(error) {
          console.log('!!mplayer onVolume ERROR!!', error);
        }
      }

      function onPosition(position) {
        try {
          if(player) {
            player.stdin.write('set_property time_pos ' + position + '\n');
          }
          status.timePosition = position;
          socket.broadcast.emit('mplayer.status', status);
        } catch(error) {
          console.log('!!mplayer onPosition ERROR!!', error);
        }
      }

      function onAddToPlaylist(id) {
        try {
          playlist.push(id);
          socketIo.of('/mplayer').emit('mplayer.playlist', playlist, currentTrackIndex);
        } catch(error) {
          console.log('!!mplayer onAddToPlaylist ERROR!!', error);
        }
      }

      function onGetPlaylist() {
        try {
          socket.emit('mplayer.playlist', playlist, currentTrackIndex);
        } catch(error) {
          console.log('!!mplayer onGetPlaylist ERROR!!', error);
        }
      }

      function onToggleLoopPlaylist(isLoop) {
        try {
          isLoopPlaying = isLoop;
          socketIo.of('/mplayer').emit('mplayer.isLoopPlaying', isLoopPlaying);
        } catch(error) {
          console.log('!!mplayer onToggleLoopPlaylist ERROR!!', error);
        }
      }

      function onToggleRandomPlaylist(isRandom) {
        try {
          isRandomPlaying = isRandom;
          socketIo.of('/mplayer').emit('mplayer.isRandomPlaying', isRandomPlaying);
        } catch(error) {
          console.log('!!mplayer onToggleRandomPlaylist ERROR!!', error);
        }
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

      function _killMplayer() {
        try {
          if(player) {
            player.kill('SIGINT');
          }
        } catch(error) {
          console.log('!!mplayer _killMplayer ERROR!!', error);
        }
      }

      function _incrementCurrentTrackIndex() {
        var index = 0;
        if(isRandomPlaying) {
          index = Math.floor(Math.random() * playlist.length);
        } else {
          index = currentTrackIndex + 1;
        }
        if(isLoopPlaying && index === playlist.length) {
          index = 0;
        }
        return index;
      }

      function _logPlaylist() {
        var toLog = Array.prototype.map.call(playlist, function(track) {
          return track.title;
        });
        console.log('PLAYLIST----->', toLog);
      }

    }

  }

})();
