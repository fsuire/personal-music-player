(function() {
  'use strict';

  // Watch changes and apply tasks

  var browserSync = require('browser-sync');

  exports.task = function() {
    browserSync.reload();
  };

})();
