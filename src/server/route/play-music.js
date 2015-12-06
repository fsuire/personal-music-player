(function() {
  'use strict';

  module.exports = playMusicRoute;

  playMusicRoute['@singleton'] = true;
  playMusicRoute['@require'] = ['common/mongodb/gridFS'];

  function playMusicRoute(gridFS) {

    var grid = null;

    gridFS.then(function(g) {
      grid = g;
    }, function(error) {
      console.log('ERREUR !', error);
    });


    return function(app) {
      app.get('/music/play/:id', playMusic);
    };

    ////////////////

    function playMusic(req, res, next) {
      var readstream = grid.createReadStream({
        _id: req.params.id
      });

      readstream.pipe(res);
    }

  }

})();
