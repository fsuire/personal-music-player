(function() {
  'use strict';

  angular
    .module('app.states')
    .run(configureStates);

  configureStates.$inject = ['routerHelper'];

  /**
   * @function
   * @memberOf app.states
   * @name configureStates
   *
   * @description
   * Configure the states.
   *
   * @param {object} routerHelper - {@link common.router.routerHelper The `routerHelper` service}
   */
  function configureStates(routerHelper) {
    routerHelper.addStates(_getStates(), '/');
  }

  function _getStates() {
    return [
      {
        state: 'music-player_remote',
        config: {
          url: '/music-player/remote',
          templateUrl: 'app/states/music-player/music-player.html',
          controller: 'MusicPlayerController',
          controllerAs: 'musicPlayer',
          data: {}
        }
      },
      {
        state: 'music-player_stream',
        config: {
          url: '/music-player/stream',
          templateUrl: 'app/states/music-player/music-player.html',
          controller: 'MusicPlayerController',
          controllerAs: 'musicPlayer',
          data: {}
        }
      }
    ];
  }
})();
