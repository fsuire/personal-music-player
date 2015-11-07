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
      },
      controller: MusiqueFilesController,
      bindToController: true,
      controllerAs: 'musicFiles'
    };

  }

  MusiqueFilesController.$inject = [];

  function MusiqueFilesController() {
    var vm = this;
  }

})();
