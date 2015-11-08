(function() {
  'use strict';

  angular
    .module('layout')
    .controller('LayoutBodyController', LayoutBodyController);

  LayoutBodyController.$inject = ['$rootScope', '$state'];

  function LayoutBodyController($rootScope, $state) {
    var vm = this;

    vm.stateName = $state.current.name;

    vm.onDragoverAction = onDragoverAction;

    $rootScope.$on('$stateChangeSuccess', function() {
      vm.stateName = $state.current.name;
    });

    ////////////////

    function onDragoverAction() {
      console.log('!!!');
    }

  }

})();
