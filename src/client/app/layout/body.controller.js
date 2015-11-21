(function() {
  'use strict';

  angular
    .module('layout')
    .controller('LayoutBodyController', LayoutBodyController);

  LayoutBodyController.$inject = ['$rootScope', '$state'];

  function LayoutBodyController($rootScope, $state) {
    var vm = this;

    vm.stateName = $state.current.name;

    $rootScope.$on('$stateChangeSuccess', function() {
      vm.stateName = $state.current.name;
    });

    ////////////////

  }

})();
