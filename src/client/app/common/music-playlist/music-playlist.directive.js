(function() {
  'use strict';

  angular
    .module('common.music-playlist')
    .directive('musicPlaylist', musicPlaylistDirective);

  musicPlaylistDirective.$inject = [];

  function musicPlaylistDirective() {

    return {
      restrict: 'E',
      templateUrl: 'app/common/music-playlist/music-playlist.html',
      scope: {
        socket: '='
      },
      controller: MusiquePlaylistController,
      bindToController: true,
      controllerAs: 'musicPlaylist'
    };

  }

  MusiquePlaylistController.$inject = ['$scope', 'musicPlaylist'];

  function MusiquePlaylistController($scope, musicPlaylist) {
    var vm = this;

    vm.playlist = [];
    vm.currentTrackIndex = 0;

    vm.socket.on('mplayer.playlist', socketPlaylist);

    vm.clickOnTrackAction = clickOnTrackAction;

    ////////////////

    function clickOnTrackAction(event, index) {
      if(index !== vm.currentTrackIndex) {
        vm.socket.emit('play-track', index);
      }
    }

    ////////////////

    function socketPlaylist(playlist, currentTrackIndex) {
      console.log('!!! socketPlayList');
      musicPlaylist.currentTrackIndex = currentTrackIndex;
      musicPlaylist.playlist = playlist;
      $scope.$apply(function() {
        vm.playlist = playlist;
        vm.currentTrackIndex = currentTrackIndex;
      });
    }
  }

})();
