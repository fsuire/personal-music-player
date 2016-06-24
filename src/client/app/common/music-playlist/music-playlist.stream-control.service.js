(function() {
  'use strict';

  angular
    .module('common.music-playlist')
    .factory('musicPlaylistStreamControl', musicPlaylistStreamControlFactory);

  musicPlaylistStreamControlFactory.$inject = [];

  function musicPlaylistStreamControlFactory() {

    return function(options) {
      return new PlaylistControl(options);
    };

    ////////////////

    function PlaylistControl(options) {
      var self = this;

      var _updateFunctions = {};
      var _nextId = 0;

      self.audio = options.audio;
      self.playlist = [];
      self.currentTrackIndex = 0;

      /*self.socket.on('mplayer.playlist', socketPlaylist);

      self.clickOnTrackAction = clickOnTrackAction;*/


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

      /*function clickOnTrackAction(event, index) {
        if(index !== self.currentTrackIndex) {
          self.socket.emit('play-track', index);
        }
      }*/

      ////////////////

      /*function socketPlaylist(playlist, currentTrackIndex) {
        musicPlaylist.currentTrackIndex = currentTrackIndex;
        musicPlaylist.playlist = playlist;
        self.playlist = playlist;
        self.currentTrackIndex = currentTrackIndex;
        _emitUdpate();
      }*/



    }
  }
})();
