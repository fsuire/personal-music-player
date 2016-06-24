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
        controls: '='
      },
      controller: MusiquePlaylistController,
      bindToController: true,
      controllerAs: 'musicPlaylist'
    };

  }

  MusiquePlaylistController.$inject = ['$scope'];

  function MusiquePlaylistController($scope) {
    var vm = this;

    var _destroyEvent = vm.controls.onUpdate(controlsUpdate);
    $scope.$on('$destroy', _destroyEvent);

    ////////////////

    function controlsUpdate() {
      $scope.$apply();
    }

  }

})();
