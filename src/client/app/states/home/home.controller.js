(function() {
  'use strict';

  angular
    .module('app.states')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state'];

  function HomeController($state) {
    //var vm = this;
    $state.go('music-player_remote');
  }

})();
