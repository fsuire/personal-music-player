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
        state: 'home',
        config: {
          url: '/',
          templateUrl: 'app/states/home/home.html',
          controller: 'HomeController',
          controllerAs: 'homeController',
          data: {}
        }
      }
    ];
  }
})();
