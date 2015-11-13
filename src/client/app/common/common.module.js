(function() {
  'use strict';

  /**
   * @ngdoc Module
   * @name common
   *
   * @description
   * The common module is an ensemble of custom stuff that could
   * be used in any application
   */
  angular
    .module('common', [
      'common.logger',
      'common.drag-and-drop',
      'common.music-files',
      'common.music-player',
      'common.music-playlist',
      'common.router'
    ]);
})();
