(function() {
  'use strict';

  angular
    .module('common.music-player')
    .factory('musicPlayerRemote', musicPlayerRemoteFactory);

  musicPlayerRemoteFactory.$inject = ['musicPlaylist'];

  function musicPlayerRemoteFactory(musicPlaylist) {

    return function(options, applyChanges) {
      return new PlayerControl(options, applyChanges);
    };

    ////////////////

    function PlayerControl(options, applyChanges) {
      var self = this;

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

      ////////////////

      function socketPlaylist(playlist, currentTrackIndex) {
        self.playlistLength = parseInt(playlist.length);
        self.currentTrack = musicPlaylist.playlist[currentTrackIndex] || {duration: 0};
        self.currentTrackIndex = currentTrackIndex;

        applyChanges();
      }

      function socketStatus(status) {
        console.log(':O');
        self.pause = status.pause;
        self.volume = status.volume;
        self.timePosition = status.timePosition;

        applyChanges();
      }

      function socketIsLoopPlaying(isLoop) {
        self.isLoopPlaying = isLoop;

        applyChanges();
      }

      function socketIsRandomPlaying(isRandom) {
        self.isRandomPlaying = isRandom;

        applyChanges();
      }

    }
  }
})();
