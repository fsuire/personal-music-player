(function() {
  'use strict';

  module.exports = application;

  application['@singleton'] = true;
  application['@require'] = ['express', 'common/config/config'];

  function application(express, config) {

    var app = express();

    // static directories
    for(var i in config.staticDirectories) {
      app.use(i, express.static(config.staticDirectories[i]));
    }

    return app;

  }

})();
