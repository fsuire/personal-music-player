(function() {
  'use strict';

  module.exports = gridFS;

  gridFS['@singleton'] = false;
  gridFS['@require'] = ['q', 'mongodb', 'gridfs-stream', 'common/mongodb/mongodb'];

  function gridFS(q, mongo, Grid, db) {
    var defered = q.defer();

    db.open(onDbopen);

    return defered.promise;

    ////////////////

    function onDbopen(error) {
      if(error) {
        defered.reject(error);
        return;
      }
      var grid = Grid(db, mongo);
      console.log('we have created a grid !', typeof grid);
      defered.resolve(grid);
    }
  }

})();
