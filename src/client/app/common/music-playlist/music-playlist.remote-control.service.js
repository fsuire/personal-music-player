(function() {
  'use strict';

  angular
    .module('common.music-playlist')
    .factory('musicPlaylistRemoteControl', musicPlaylistRemoteControlFactory);

  musicPlaylistRemoteControlFactory.$inject = ['musicPlaylist'];

  function musicPlaylistRemoteControlFactory(musicPlaylist) {

    return function(options) {
      return new PlaylistControl(options);
    };

    ////////////////

    function PlaylistControl(options) {
      var self = this;

      var _updateFunctions = {};
      var _nextId = 0;

      self.socket = options.socket;
      self.playlist = [];
      self.currentTrackIndex = 0;

      self.socket.on('mplayer.playlist', socketPlaylist);

      self.clickOnTrackAction = clickOnTrackAction;


      self.onUpdate = onUpdate;

      ////////////////

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

      function clickOnTrackAction(event, index) {
        if(index !== self.currentTrackIndex) {
          self.socket.emit('play-track', index);
        }
      }

      ////////////////

      function socketPlaylist(playlist, currentTrackIndex) {
        musicPlaylist.currentTrackIndex = currentTrackIndex;
        musicPlaylist.playlist = playlist;
        self.playlist = playlist;
        self.currentTrackIndex = currentTrackIndex;
        _emitUdpate();
      }



    }
  }
})();
