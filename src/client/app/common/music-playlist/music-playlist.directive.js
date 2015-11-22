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

    vm.socket.on('mplayer.playlist', socketPlaylist);

    ////////////////

    function socketPlaylist(playlist) {
      musicPlaylist.playlist = playlist;
      $scope.$apply(function() {
        vm.playlist = playlist;
      });
    }
  }

})();
