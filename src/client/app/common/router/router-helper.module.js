(function() {
  'use strict';

  /**
   * @ngdoc Module
   * @name common.router
   *
   * @description
   * The reusable router module.
   */
  angular
    .module('common.router', [
      'ui.router',
      'common.logger'
    ]);
})();
