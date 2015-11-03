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
      },
      controller: MusiquePlayerController,
      bindToController: true,
      controllerAs: 'musicPlayer'
    };

  }

  MusiquePlayerController.$inject = ['$scope', '$location', 'socketIo'];

  function MusiquePlayerController($scope, $location, socketIo) {
    var vm = this;

    var _socket = socketIo.connect($location.host() + ':' + $location.port() + '/mplayer');

    _socket.on('mplayer.status', socketStatus);

    vm.pause = false;
    vm.volume = null;
    vm.meta = {
      title: null,
      duration: 0,
      durationSecond: 0,
      timePosition: 0,
      timePositionSecond: 0
    };

    vm.playAction = playAction;
    vm.pauseAction = pauseAction;
    vm.volumeAction = volumeAction;
    vm.timeLineAction = timeLineAction;

    ////////////////

    function playAction() {
      _socket.emit('play', {});
    }

    function pauseAction() {
      _socket.emit('pause', {});
    }

    function volumeAction() {
      _socket.emit('volume', vm.volume);
    }

    function timeLineAction() {
      _socket.emit('position', vm.meta.timePositionSecond);
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
