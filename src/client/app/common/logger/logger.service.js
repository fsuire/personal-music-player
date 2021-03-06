(function() {
  'use strict';

  angular
    .module('common.logger')
    .factory('logger', loggerFactory);

  loggerFactory.$inject = ['$log'];

  /**
   * @ngdoc Factory
   * @memberOf common.logger
   * @name loggerFactory
   *
   * @description
   * Returns an instance of the `logger` service.
   *
   * @param {object} $log - The angular `$log` service
   *
   * @returns @param {object} {@link common.logger.logger The `logger` service}
   */
  function loggerFactory($log) {
    /**
     * @ngdoc Service
     * @memberOf common.logger
     * @name logger
     *
     * @description
     * The `logger` service.
     */
    var service = {
      log: log,
      info: info,
      warn: warn,
      error: error,
      debug: debug
    };

    return service;

    ////////////////

    /**
     * @method
     * @memberOf common.logger.logger
     * @name log
     *
     * @description
     * Write a log message.
     *
     * @param {string} message - The message
     * @param {*} [data]       - The data associated to the message
     */
    function log(message, data) {
      $log.log(message, data);
    }

    /**
     * @method
     * @memberOf common.logger.logger
     * @name info
     *
     * @description
     * Write an information message.
     *
     * @param {string} message - The message
     * @param {*} [data]       - The data associated to the message
     */
    function info(message, data) {
      $log.info('Info: ' + message, data);
    }

    /**
     * @method
     * @memberOf common.logger.logger
     * @name warn
     *
     * @description
     * Write a warning message.
     *
     * @param {string} message - The message
     * @param {*} [data]       - The data associated to the message
     */
    function warn(message, data) {
      $log.warn('Warning: ' + message, data);
    }

    /**
     * @method
     * @memberOf common.logger.logger
     * @name error
     *
     * @description
     * Write an error message.
     *
     * @param {string} message - The message
     * @param {*} [data]       - The data associated to the message
     */
    function error(message, data) {
      $log.error('Error: ' + message, data);
    }

    /**
     * @method
     * @memberOf common.logger.logger
     * @name debug
     *
     * @description
     * Write a debug message.
     *
     * @param {string} message - The message
     * @param {*} [data]       - The data associated to the message
     */
    function debug(message, data) {
      $log.debug('Debug: ' + message, data);
    }
  }
})();
