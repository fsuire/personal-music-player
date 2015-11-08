(function() {
  'use strict';

  module.exports = uploadMusicRoute;

  uploadMusicRoute['@singleton'] = true;
  uploadMusicRoute['@require'] = [];

  function uploadMusicRoute() {
    return function(app) {
      app.post('/upload-music', function(req, res) {
        console.log('!!!');
        res.end();
      });
    };
  }

})();
