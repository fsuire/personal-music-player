(function() {
  'use strict';

  angular
    .module('app.states')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$location', 'socketIo'];

  function HomeController($location, socketIo) {
    var vm = this;

    vm.searchDisplay = false;
    vm.socket = socketIo.connect($location.host() + ':' + $location.port() + '/mplayer');

    vm.toggleSearchDisplayAction = toggleSearchDisplayAction;

    ////////////////

    function toggleSearchDisplayAction() {
      vm.searchDisplay = !vm.searchDisplay;
    }
  }

})();
