(function() {
  'use strict';

  var browserSync = require('browser-sync');

  exports.task = function() {
    if(SYNC) {
      browserSync({
        proxy: 'localhost:' + PORT,
        port: 3000
      });
    }

  };

})();
