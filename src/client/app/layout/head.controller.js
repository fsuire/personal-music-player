(function() {
  'use strict';

  angular
    .module('layout')
    .controller('LayoutHeadController', LayoutHeadController);

  LayoutHeadController.$inject = [];

  function LayoutHeadController(
  ) {
    var vm = this;

    vm.pageTitle = 'your title here';

  }

})();
