(function() {
  'use strict';

  angular
    .module('common.music-playlist')
    .factory('musicStreamPlaylist', musicStreamPlaylistFactory);

  musicStreamPlaylistFactory.$inject = [];

  function musicStreamPlaylistFactory() {

    return function(options) {
      return new Playlist(options);
    };

    ////////////////

    function Playlist(options) {
      var self = this;
      
      var _playlist = [];
      
      self.album = null;
      self.artist = null;
      self.duration = null;
      self.id = null;
      self.title = null;
      
      self.append = append;
      
      ////////////////
      
      function append(options) {
        self.album = options.album;
        self.artist = options.artist;
        self.duration = options.duration;
        self.id = options.id;
        self.title = options.title;
      }
    }
  }
})();
