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
        controls: '='
      },
      controller: MusiquePlayerController,
      bindToController: true,
      controllerAs: 'musicPlayer'
    };

  }

  MusiquePlayerController.$inject = ['$scope'];

  function MusiquePlayerController($scope) {
    var vm = this;

    var _destroyEvent = vm.controls.onUpdate(controlsUpdate);
    $scope.$on('$destroy', _destroyEvent);

    ////////////////

    function controlsUpdate() {
      $scope.$apply();
    }
  }

})();
