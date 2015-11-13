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

  MusiqueFilesController.$inject = ['$scope', '$http', 'FileUploader'];

  function MusiqueFilesController($scope, $http, FileUploader) {
    var vm = this;

    vm.musicList = [];

    vm.fileUploader = new FileUploader({
      url: 'upload-music'
    });

    vm.fileUploader.filters.push({
      name: 'audio-mpeg',
      fn: function(item) {
        var isOk = false;
        if(item.type === 'audio/mpeg') {
          isOk = true;
        }
        return isOk;
      }
    });

    vm.fileUploader.onWhenAddingFileFailed = onWhenAddingFileFailed;
    vm.fileUploader.onAfterAddingFile = onAfterAddingFile;
    vm.fileUploader.onAfterAddingAll = onAfterAddingAll;
    vm.fileUploader.onCompleteAll = onCompleteAll;

    vm.uploadFilesAction = uploadFilesAction;
    vm.addToPlaylistAction = addToPlaylistAction;

    $http.get('/music/list').then(function(response) {
      console.log(response.data);
      vm.musicList = response.data;
    });

    ////////////////

    function onWhenAddingFileFailed(fileItem, filter, options) {
      //console.info('onWhenAddingFileFailed', fileItem, filter, options);
    }

    function onAfterAddingFile(fileItem) {
      //console.info('onAfterAddingFile', fileItem);
    }

    function onAfterAddingAll(fileItems) {
      //console.info('onAfterAddingAll', fileItems);
    }

    function onCompleteAll(fileItems) {
      console.info('onCompleteAll', fileItems);
      vm.fileUploader.clearQueue();
    }

    ////////////////

    function uploadFilesAction() {
      vm.fileUploader.uploadAll();
    }

    function addToPlaylistAction($event, id) {
      console.log('/music/play/' + id);
      vm.socket.emit('addToPlaylist', id);
    }

  }

})();
