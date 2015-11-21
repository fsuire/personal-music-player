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

  MusiquePlaylistController.$inject = ['$scope'];

  function MusiquePlaylistController($scope) {
    var vm = this;

    vm.playlist = [];

    vm.socket.on('mplayer.status', socketStatus);

    ////////////////

    function socketStatus(status) {
      $scope.$apply(function() {
        vm.playlist = status.playlist;
      });
    }
  }

})();
