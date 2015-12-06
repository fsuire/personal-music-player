(function() {
  'use strict';

  module.exports = uploadMusicRoute;

  uploadMusicRoute['@singleton'] = true;
  uploadMusicRoute['@require'] = ['fs', 'lodash', 'streamifier', 'multer', 'uid', 'node-ffprobe', 'common/mongodb/mongodb', 'common/mongodb/gridFS'];

  function uploadMusicRoute(fs, _, streamifier, multer, uid, probe, db, gridFS) {

    var upload = multer();

    var grid = null;

    gridFS.then(function(g) {
      grid = g;
    }, function(error) {
      console.log('ERREUR !', error);
    });


    return function(app) {
      app.post('/upload-music', upload.any(), addMusic);
    };

    ////////////////

    function addMusic(req, res) {
      var file = req.files[0];

      try {
        var tmpName = 'tmp/' + uid(15);
        fs.writeFile(tmpName, file.buffer, function(err) {
          if(err) {
            console.log('erreur lors de l\'ecriture du fichier', err);
          }
          probe(tmpName, function(err, probeData) {
            if(err) {
              console.log('erreur lors de l\'analyse du fichier', err);
            }
            var writestream = grid.createWriteStream({
              filename: file.originalname,
              metadata: {
                title: probeData.metadata.title,
                artist: probeData.metadata.artist,
                album: probeData.metadata.album,
                duration: probeData.streams[0].duration
              }
            });

            var readable = streamifier.createReadStream(file.buffer);
            var pipe = readable.pipe(writestream);

            readable.on('end', function() {
              res.end();
            });

            readable.on('error', function() {
              console.log('/upload-music error', error);
            });

            fs.unlinkSync(tmpName);
          });
        });



      } catch(error) {
        console.log('/upload-music error', error);
      }
    }

  }

})();
