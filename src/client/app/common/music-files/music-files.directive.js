(function() {
  'use strict';

  angular
    .module('common.music-files')
    .directive('musicFiles', musicFilesDirective);

  musicFilesDirective.$inject = [];

  function musicFilesDirective() {

    return {
      restrict: 'E',
      templateUrl: 'app/common/music-files/music-files.html',
      scope: {
        controls: '='
      },
      controller: MusiqueFilesController,
      bindToController: true,
      controllerAs: 'musicFiles'
    };

  }

  MusiqueFilesController.$inject = ['$scope', '$http'];

  function MusiqueFilesController($scope, $http) {
    var vm = this;

    var _destroyEvent = vm.controls.onUpdate(controlsUpdate);
    $scope.$on('$destroy', _destroyEvent);

    ////////////////

    function controlsUpdate() {
      $scope.$apply();
    }

  }

})();
