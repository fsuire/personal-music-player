(function() {
  'use strict';

  angular
    .module('common.music-player')
    .directive('musicPlayer', musicPlayerDirective);

  musicPlayerDirective.$inject = [];

  function musicPlayerDirective() {

    return {
      restrict: 'E',
      templateUrl: 'app/common/music-player/music-player.html',
      scope: {
        socket: '='
      },
      controller: MusiquePlayerController,
      bindToController: true,
      controllerAs: 'musicPlayer'
    };

  }

  MusiquePlayerController.$inject = ['$scope', 'musicPlaylist'];

  function MusiquePlayerController($scope, musicPlaylist) {
    var vm = this;

    var _currentTrackIndex = -1;

    vm.hasPlaylist = false;
    vm.pause = true;
    vm.volume = 100;
    vm.timePosition = 0;
    vm.currentTrack = {duration: 0};

    vm.socket.on('mplayer.status', socketStatus);
    vm.socket.on('mplayer.playlist', socketPlaylist);

    vm.playAction = playAction;
    vm.pauseAction = pauseAction;
    vm.volumeAction = volumeAction;
    vm.timeLineAction = timeLineAction;

    ////////////////

    function playAction() {
      vm.socket.emit('play', {});
    }

    function pauseAction() {
      vm.socket.emit('pause', {});
    }

    function volumeAction() {
      vm.socket.emit('volume', vm.volume);
    }

    function timeLineAction() {
      vm.socket.emit('position', vm.timePosition);
    }

    ////////////////

    function socketStatus(status) {
      $scope.$apply(function() {
        if(_currentTrackIndex !== status.currentTrackIndex) {
          _currentTrackIndex = status.currentTrackIndex;
          vm.currentTrack = musicPlaylist.playlist[_currentTrackIndex] || {duration: 0};
        }

        vm.pause = status.pause;
        vm.volume = status.volume;
        vm.timePosition = status.timePosition;
      });
    }

    function socketPlaylist(playlist) {
      $scope.$apply(function() {
        vm.hasPlaylist = !!playlist.length;
        if(_currentTrackIndex > -1 && vm.currentTrack.id !== musicPlaylist.playlist[_currentTrackIndex].id) {
          vm.currentTrack = musicPlaylist.playlist[_currentTrackIndex];
        }
      });
    }

  }

})();
