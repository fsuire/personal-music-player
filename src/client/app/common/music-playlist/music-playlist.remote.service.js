(function() {
  'use strict';

  angular
    .module('common.music-playlist')
    .factory('musicRemotePlaylist', musicRemotePlaylistFactory);

  musicRemotePlaylistFactory.$inject = [];

  function musicRemotePlaylistFactory() {
    var playlist = {playlist: [], currentTrackIndex: 0};
    return playlist;
  }

})();
