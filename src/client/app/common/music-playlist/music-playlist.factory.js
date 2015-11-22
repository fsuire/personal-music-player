(function() {
  'use strict';

  angular
    .module('common.music-playlist')
    .factory('musicPlaylist', musicPlaylistFactory);

  musicPlaylistFactory.$inject = [];

  function musicPlaylistFactory() {
    var playlist = {playlist: []};
    return playlist;
  }

})();
