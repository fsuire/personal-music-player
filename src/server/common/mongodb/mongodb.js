(function() {
  'use strict';

  module.exports = mongodb;

  mongodb['@singleton'] = true;
  mongodb['@require'] = ['mongodb'];

  function mongodb(mongo) {
    var db = new mongo.Db('personal-music-player', new mongo.Server("127.0.0.1", 27017));
    return db;
  }

})();
