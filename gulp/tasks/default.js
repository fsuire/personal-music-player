(function() {
  'use strict';

  // clean and serve the application

  var runSequence = require('run-sequence');

  exports.task = function(callback) {

    runSequence(
      ['clean'],
      ['browserify-frontlib'],
      ['karma'],
      ['build'],
      ['nodemon'],
      ['browsersync'],
      ['watch'],
      callback
    );

  };

})();
