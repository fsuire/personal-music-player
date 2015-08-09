(function() {
  'use strict';

  // clean and serve the application

  var runSequence = require('run-sequence');

  exports.task = function(callback) {

    runSequence(
      ['clean'],
      ['karma'],
      ['build'],
      ['watch'],
      ['sync-serve'],
      callback
    );

  };

})();
