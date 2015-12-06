(function() {
  'use strict';

  module.exports = uploadMusicRoute;

  uploadMusicRoute['@singleton'] = true;
  uploadMusicRoute['@require'] = ['lodash', 'common/mongodb/mongodb'];

  function uploadMusicRoute(_, db) {

    return function(app) {
      app.get('/music/search/:searchText', searchMusic);
    };

    ////////////////

    function searchMusic(req, res) {
      var searchText = new RegExp(req.params.searchText, 'i');
      db.collection('fs.files')
        .find({$or: [
          {"metadata.artist": searchText},
          {"metadata.album": searchText},
          {"metadata.title": searchText}
        ]})
        .toArray(function(error, docs) {
          var response = [];
          _.forEach(docs, function(doc) {
            var track = {
              id: doc._id
            };
            _.merge(track, doc.metadata);
            response.push(track);
          });
          res.end(JSON.stringify(response));
        });
    }
  }

})();
