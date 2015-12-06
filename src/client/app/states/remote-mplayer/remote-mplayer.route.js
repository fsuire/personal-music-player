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
        state: 'remote-mplayer',
        config: {
          url: '/remote-mplayer',
          templateUrl: 'app/states/remote-mplayer/remote-mplayer.html',
          controller: 'RemoteMplayerController',
          controllerAs: 'remoteMplayer',
          data: {}
        }
      }
    ];
  }
})();
