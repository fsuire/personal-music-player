/* global THREE:false */
(function() {
  'use strict';

  angular
    .module('vendor')
    .factory('socketIo', socketIoVendorFactory);

  socketIoVendorFactory.$inject = [];

  function socketIoVendorFactory() {
    /* global io:false */
    return io;
  }

})();
