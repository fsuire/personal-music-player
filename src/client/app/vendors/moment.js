/* global THREE:false */
(function() {
  'use strict';

  angular
    .module('vendors')
    .factory('moment', momentVendorFactory);

  momentVendorFactory.$inject = [];

  function momentVendorFactory() {
    /* global moment:false */
    return moment;
  }

})();
