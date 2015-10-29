(function() {
  'use strict';

  angular
    .module('app.states')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['socketIo'];

  function HomeController(socketIo) {
    var vm = this;

    var _socket = socketIo();

    vm.title = 'Mplayer';
    vm.isPlaying = false;
    vm.playButtonLabel = 'play';

    vm.playPauseAction = playPauseAction;

    ////////////////

    function playPauseAction() {
      console.log('!!!');
      var eventOptions = {};
      var eventName = null;

      if(!vm.isPlaying && vm.playButtonLabel == 'play') {
        eventName = 'play';
        vm.isPlaying = true;
        vm.playButtonLabel = 'pause';

      } else if(vm.playButtonLabel == 'pause') {
        eventName = 'pause';
        vm.playButtonLabel = 'play';
      } else {
        eventName = 'pause';
        vm.playButtonLabel = 'pause';
      }

      _socket.emit(eventName, eventOptions);
    }

  }

})();
