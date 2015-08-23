(function() {
  'use strict';

  module.exports = application;

  application['@singleton'] = true;
  application['@require'] = ['config/config.json'];

  function application(config) {

    config = JSON.stringify(config);
    config = config.replace(/%ENV%/, process.env.ENV);

    return JSON.parse(config);

  }

})();
