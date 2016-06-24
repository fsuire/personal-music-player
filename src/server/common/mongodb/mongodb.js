(function() {
  'use strict';

  module.exports = mongodb;

  mongodb['@singleton'] = true;
  mongodb['@require'] = ['mongodb', 'common/config/config'];

  function mongodb(mongo, config) {
    var db = new mongo.Db('personal-music-player', new mongo.Server(config.mongodb.host, config.mongodb.port));
    return db;
  }

})();
