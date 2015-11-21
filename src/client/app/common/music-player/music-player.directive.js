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

  MusiquePlayerController.$inject = ['$scope'];

  function MusiquePlayerController($scope) {
    var vm = this;

    vm.socket.on('mplayer.status', socketStatus);

    vm.hasPlaylist = false;
    vm.pause = true;
    vm.volume = 100;

    vm.meta = {};
    vm.meta.title = vm.meta.title || null;
    vm.meta.duration = vm.meta.duration || '00:00';
    vm.meta.durationSecond = vm.meta.durationSecond || 0;
    vm.meta.timePosition = vm.meta.timePosition || '00:00';
    vm.meta.timePositionSecond = vm.meta.timePositionSecond || 0;

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
      vm.socket.emit('position', vm.meta.timePositionSecond);
    }

    ////////////////

    function socketStatus(status) {

      $scope.$apply(function() {
        vm.pause = status.pause;
        vm.volume = status.volume;
        vm.meta.title = status.meta.title;
        vm.meta.duration = _second2minute(status.meta.duration);
        vm.meta.durationSecond = Math.floor(status.meta.duration);
        vm.meta.timePosition = _second2minute(status.meta.timePosition);
        vm.meta.timePositionSecond = Math.floor(status.meta.timePosition);
        vm.hasPlaylist = !!status.playlist.length;
      });
    }

    ////////////////

    function _second2minute(seconds) {
      var minutes = seconds / 60;
      var floorMinutes = Math.floor(minutes);
      seconds = Math.floor((minutes - floorMinutes) * 60);

      if(floorMinutes < 60) {
        return __prefix0(floorMinutes) + ':' + __prefix0(seconds);
      }

      var hours = floorMinutes / 60;
      var floorHours = Math.floor(hours);
      floorMinutes = Math.floor((hours - floorHours) * 60);

      return __prefix0(floorHours) + ':' + __prefix0(floorMinutes) + ':' + __prefix0(seconds);

      function __prefix0(what) {
        if(what < 10) {
          what = '0' + what;
        }
        return what;
      }

    }

  }

})();
