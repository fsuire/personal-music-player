(function() {
  'use strict';

  module.exports = server;

  server['@singleton'] = true;
  server['@require'] = ['application', 'common/config/config'];

  function server(app, config) {

    var port = process.env.PORT;

    var server = app.listen(port, function() {
      console.log('app running on port ' + port);
    });

    return server;

  }

})();
