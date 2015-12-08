(function() {
  'use strict';

  angular
    .module('common.music-files')
    .factory('musicFileRemoteControl', musicFileRemoteControlFactory);

  musicFileRemoteControlFactory.$inject = ['musicPlaylist'];

  function musicFileRemoteControlFactory(musicPlaylist) {

    return function(options) {
      return new FileControl(options);
    };

    ////////////////

    function FileControl(options) {
      var self = this;

      var _updateFunctions = {};
      var _nextId = 0;

      self.socket = options.socket;
      self.musicList = options.musicList || [];

      self.addToPlaylistAction = addToPlaylistAction;


      self.onUpdate = onUpdate;
      self.setMusicList = setMusicList;

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

      function setMusicList(musiclist) {
        self.musicList = musiclist;
      }

      ////////////////

      function addToPlaylistAction($event, id) {
        self.socket.emit('addToPlaylist', id);
      }



    }
  }
})();
