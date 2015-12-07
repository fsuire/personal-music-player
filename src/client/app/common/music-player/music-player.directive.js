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

  MusiquePlayerController.$inject = ['$scope', 'musicPlayerRemote'];

  function MusiquePlayerController($scope, musicPlayerRemote) {
    var vm = this;

    vm.controls = null;

    if(vm.socket) {
      vm.controls =  musicPlayerRemote({socket: vm.socket}, _scopeApply);
    }

    ////////////////

    function _scopeApply() {
      $scope.$apply();
    }

  }

})();
