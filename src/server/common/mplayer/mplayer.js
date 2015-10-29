(function() {
  'use strict';

  //////////
  // mplayer -input cmdlist
  //////////

  module.exports = mplayer;

  mplayer['@singleton'] = true;
  mplayer['@require'] = ['child_process', 'service/socketEventBus'];

  function mplayer(childProcess, socketEventBus) {


    var player = null;



    socketEventBus.on('add', function(id, socket) {
      socket.on('play', onPlay);
      socket.on('pause', onPause);
    });

    ////////////////

    function onPlay() {
      if(player) {
        return;
      }

      player = childProcess.spawn('mplayer', [
        '-slave',
        '-input',
        'file="/home/fred/fifo/mplayer-control"',
        '/data/Musique/Amy Winehouse/Back to Black/01 Rehab.mp3'
      ]);

      player.on('exit', function (exitCode) {
        console.log("Child exited with code: " + exitCode);
        player = null;
      });

      player.stdout.on('data', function (data) {
        console.log('We received a reply: ' + data);
      });

      player.stderr.on('data', function (data) {
        //console.log('There was an error: ' + data);
      });

    }

    function onPause() {
      childProcess.exec('echo "pause" > /home/fred/fifo/mplayer-control');
    }
  }

})();
