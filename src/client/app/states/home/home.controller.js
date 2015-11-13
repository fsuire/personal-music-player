(function() {
  'use strict';

  angular
    .module('app.states')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$location', 'socketIo'];

  function HomeController($location, socketIo) {
    var vm = this;

    vm.meta = {};
    vm.socket = socketIo.connect($location.host() + ':' + $location.port() + '/mplayer');

  }

})();
