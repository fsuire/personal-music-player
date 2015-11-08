(function() {
  'use strict';

  module.exports = application;

  application['@singleton'] = true;
  application['@require'] = ['lodash', 'express', 'electrolyte', 'common/config/config'];

  function application(_, express, IoC, config) {

    var app = express();

    // static directories
    for(var i in config.staticDirectories) {
      app.use(i, express.static(config.staticDirectories[i]));
    }

    _.forEach(config.routes, function(route) {
      IoC.create(route)(app);
    });

    return app;

  }

})();
