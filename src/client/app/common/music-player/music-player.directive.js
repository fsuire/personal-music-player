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

    vm.playlistLength = 0;
    vm.pause = true;
    vm.volume = 100;
    vm.timePosition = 0;
    vm.currentTrack = {duration: 0};
    vm.currentTrackIndex = 0;
    vm.isLoopPlaying = false;
    vm.isRandomPlaying = false;

    vm.socket.on('mplayer.playlist', socketPlaylist);
    vm.socket.on('mplayer.status', socketStatus);
    vm.socket.on('mplayer.isLoopPlaying', socketIsLoopPlaying);
    vm.socket.on('mplayer.isRandomPlaying', socketIsRandomPlaying);
    vm.socket.emit('getPlaylist', {});

    vm.playAction = playAction;
    vm.pauseAction = pauseAction;
    vm.previousTrackAction = previousTrackAction;
    vm.nextTrackAction = nextTrackAction;
    vm.volumeAction = volumeAction;
    vm.timeLineAction = timeLineAction;
    vm.toggleLoopPlaylistAction = toggleLoopPlaylistAction;
    vm.toggleRandomPlaylistAction = toggleRandomPlaylistAction;

    ////////////////

    function playAction() {
      vm.socket.emit('play', {});
    }

    function pauseAction() {
      vm.socket.emit('pause', {});
    }

    function previousTrackAction() {
      vm.socket.emit('previous-track', {});
    }

    function nextTrackAction() {
      vm.socket.emit('next-track', {});
    }

    function volumeAction() {
      vm.socket.emit('volume', vm.volume);
    }

    function timeLineAction() {
      vm.socket.emit('position', vm.timePosition);
    }

    function toggleLoopPlaylistAction() {
      //vm.isLoopPlaying = !vm.isLoopPlaying;
      vm.socket.emit('toggle-loop-playlist', !vm.isLoopPlaying);
    }

    function toggleRandomPlaylistAction() {
      //vm.isRandomPlaying = !vm.isRandomPlaying;
      vm.socket.emit('toggle-random-playlist', !vm.isRandomPlaying);
    }

    ////////////////

    function socketPlaylist(playlist, currentTrackIndex) {
      $scope.$apply(function() {
        vm.playlistLength = parseInt(playlist.length);
        vm.currentTrack = musicPlaylist.playlist[currentTrackIndex] || {duration: 0};
        vm.currentTrackIndex = currentTrackIndex;
      });
    }

    function socketStatus(status) {
      $scope.$apply(function() {
        vm.pause = status.pause;
        vm.volume = status.volume;
        vm.timePosition = status.timePosition;
      });
    }

    function socketIsLoopPlaying(isLoop) {
      $scope.$apply(function() {
        vm.isLoopPlaying = isLoop;
      });
    }

    function socketIsRandomPlaying(isRandom) {
      $scope.$apply(function() {
        vm.isRandomPlaying = isRandom;
      });
    }

  }

})();
