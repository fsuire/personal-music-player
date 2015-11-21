(function() {
  'use strict';

  module.exports = uploadMusicRoute;

  uploadMusicRoute['@singleton'] = true;
  uploadMusicRoute['@require'] = ['fs', 'streamifier', 'multer', 'common/mongodb/mongodb', 'common/mongodb/gridFS'];

  function uploadMusicRoute(fs, streamifier, multer, db, gridFS) {

    var upload = multer();

    var grid = null;

    gridFS.then(function(g) {
      grid = g;
    }, function(error) {
      console.log('ERREUR !', error);
    });


    return function(app) {
      app.post('/upload-music', upload.any(), addMusic);
      app.get('/music/list', getMusicList);
      app.get('/music/play/:id', playMusic);
    };

    ////////////////

    function addMusic(req, res) {
      var file = req.files[0];

      try {
        var writestream = grid.createWriteStream({
          filename: file.originalname
        });

        var readable = streamifier.createReadStream(file.buffer);
        var pipe = readable.pipe(writestream);

        readable.on('end', function() {
          res.end();
        });

        readable.on('error', function() {
          console.log('/upload-music error', error);
        });

      } catch(error) {
        console.log('/upload-music error', error);
      }
    }

    function getMusicList(req, res, next) {
      db.collection('fs.files').find().toArray(function(error, docs) {
        res.end(JSON.stringify(docs));
      });
    }

    function playMusic(req, res, next) {
      var readstream = grid.createReadStream({
        _id: req.params.id
      });

      readstream.pipe(res);
    }

  }

})();
