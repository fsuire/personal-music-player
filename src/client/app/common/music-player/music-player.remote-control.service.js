(function() {
  'use strict';

  angular
    .module('common.music-player')
    .factory('musicPlayerRemoteControl', musicPlayerRemoteControlFactory);

  musicPlayerRemoteControlFactory.$inject = ['musicPlaylist'];

  function musicPlayerRemoteControlFactory(musicPlaylist) {

    return function(options) {
      return new PlayerControl(options);
    };

    ////////////////

    function PlayerControl(options) {
      var self = this;

      var _updateFunctions = {};
      var _nextId = 0;

      self.socket = options.socket;
      self.playlistLength = 0;
      self.pause = true;
      self.volume = 100;
      self.timePosition = 0;
      self.currentTrack = {duration: 0};
      self.currentTrackIndex = 0;
      self.isLoopPlaying = false;
      self.isRandomPlaying = false;

      self.socket.on('mplayer.playlist', socketPlaylist);
      self.socket.on('mplayer.status', socketStatus);
      self.socket.on('mplayer.isLoopPlaying', socketIsLoopPlaying);
      self.socket.on('mplayer.isRandomPlaying', socketIsRandomPlaying);

      self.playAction = playAction;
      self.pauseAction = pauseAction;
      self.previousTrackAction = previousTrackAction;
      self.nextTrackAction = nextTrackAction;
      self.volumeAction = volumeAction;
      self.timeLineAction = timeLineAction;
      self.toggleLoopPlaylistAction = toggleLoopPlaylistAction;
      self.toggleRandomPlaylistAction = toggleRandomPlaylistAction;

      self.onUpdate = onUpdate;

      self.socket.emit('getPlaylist', {});

      ////////////////

      function playAction() {
        self.socket.emit('play', {});
      }

      function pauseAction() {
        self.socket.emit('pause', {});
      }

      function previousTrackAction() {
        self.socket.emit('previous-track', {});
      }

      function nextTrackAction() {
        self.socket.emit('next-track', {});
      }

      function volumeAction() {
        self.socket.emit('volume', self.volume);
      }

      function timeLineAction() {
        self.socket.emit('position', self.timePosition);
      }

      function toggleLoopPlaylistAction() {
        self.socket.emit('toggle-loop-playlist', !self.isLoopPlaying);
      }

      function toggleRandomPlaylistAction() {
        self.socket.emit('toggle-random-playlist', !self.isRandomPlaying);
      }

      function onUpdate(fn) {
        var id = _nextId;
        _nextId++;
        _updateFunctions[id] = fn;
        return function() {
          delete _updateFunctions[id];
        };
      }

      function _emitUdpate() {
        for(var i in _updateFunctions) {
          _updateFunctions[i]();
        }
      }

      ////////////////

      function socketPlaylist(playlist, currentTrackIndex) {
        self.playlistLength = parseInt(playlist.length);
        self.currentTrack = musicPlaylist.playlist[currentTrackIndex] || {duration: 0};
        self.currentTrackIndex = currentTrackIndex;
        _emitUdpate();
      }

      function socketStatus(status) {
        self.pause = status.pause;
        self.volume = status.volume;
        self.timePosition = status.timePosition;
        _emitUdpate();
      }

      function socketIsLoopPlaying(isLoop) {
        self.isLoopPlaying = isLoop;
        _emitUdpate();
      }

      function socketIsRandomPlaying(isRandom) {
        self.isRandomPlaying = isRandom;
        _emitUdpate();
      }

    }
  }
})();
