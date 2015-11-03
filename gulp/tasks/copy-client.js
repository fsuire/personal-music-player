(function() {
  'use strict';

  // Copy client code from src to the outputDir

  var runSequence = require('run-sequence');

  exports.task = function(callback) {

    runSequence(
      ['copy-css', 'copy-fonts', 'copy-html', 'copy-js-client', 'copy-images'],
      callback
    );

  };

})();
