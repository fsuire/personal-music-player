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
      /* Bower module */
      'angularFileUpload',
      'ngAnimate',

      /* Shared module */
      'common',
      'vendors',

      /* Feature areas */
      'layout',

      /* States */
      'app.states'
    ]);
})();
