(function() {
  'use strict';

  angular
    .module('app.states')
    .controller('HomeController', HomeController);

  HomeController.$inject = [];

  function HomeController(
  ) {
    var vm = this;

    vm.title = 'Home page';

  }

})();
