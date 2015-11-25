(function() {
  'use strict';

  angular
    .module('app.states')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$location', 'socketIo', 'FileUploader'];

  function HomeController($location, socketIo, FileUploader) {
    var vm = this;

    vm.searchDisplay = false;
    vm.fileUploadDisplay = false;
    vm.socket = socketIo.connect($location.host() + ':' + $location.port() + '/mplayer');
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

    vm.toggleSearchDisplayAction = toggleSearchDisplayAction;
    vm.toggleFileUploadDisplayAction = toggleFileUploadDisplayAction;
    vm.uploadFilesAction = uploadFilesAction;

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

    function toggleSearchDisplayAction() {
      vm.searchDisplay = !vm.searchDisplay;
      if(vm.fileUploadDisplay && vm.searchDisplay) {
        vm.fileUploadDisplay = false;
      }
    }

    function toggleFileUploadDisplayAction() {
      vm.fileUploadDisplay = !vm.fileUploadDisplay;
      if(vm.searchDisplay && vm.fileUploadDisplay) {
        vm.searchDisplay = false;
      }
    }
  }

})();
