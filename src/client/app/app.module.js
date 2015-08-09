(function() {
  'use strict';

  /**
   * @ngdoc Module
   * @name app
   *
   * @description
   * The application module is a manifest of the application's features.
   */
  angular
    .module('app', [
      /* Shared module */
      'common',

      /* Feature areas */
      'layout'
    ]);
})();
