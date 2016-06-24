/* global THREE:false */
(function() {
  'use strict';

  angular
    .module('vendors')
    .factory('Audio', audioVendorFactory);

  audioVendorFactory.$inject = [];

  function audioVendorFactory() {
    /* global Audio:false */
    return Audio;
  }

})();
