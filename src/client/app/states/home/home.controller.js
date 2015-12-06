(function() {
  'use strict';

  angular
    .module('app.states')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$location', '$http', 'socketIo', 'FileUploader'];

  function HomeController($location, $http, socketIo, FileUploader) {
    var vm = this;

  }

})();
