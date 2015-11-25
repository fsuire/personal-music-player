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
        socket: '='
      },
      controller: MusiqueFilesController,
      bindToController: true,
      controllerAs: 'musicFiles'
    };

  }

  MusiqueFilesController.$inject = ['$scope', '$http'];

  function MusiqueFilesController($scope, $http) {
    var vm = this;

    vm.musicList = [];

    vm.addToPlaylistAction = addToPlaylistAction;

    $http.get('/music/list').then(function(response) {
      vm.musicList = response.data;
    });

    ////////////////

    function addToPlaylistAction($event, id) {
      vm.socket.emit('addToPlaylist', id);
    }

  }

})();
