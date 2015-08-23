(function() {
  'use strict';

  // Build the application

  var runSequence = require('run-sequence');

  exports.task = function(callback) {

    switch(ENV) {
      case 'dev' :
      case 'development' :
        runSequence(
          ['lint-js'],
          ['stylus'],
          ['copy-server', 'copy-client'],
          ['inject'],
          callback
        );
        break;
      case 'prod' :
      case 'production' :
        runSequence(
          ['lint-js'],
          ['stylus'],
          ['copy-server', 'vendor', 'application-minify', 'copy-fonts'],
          ['inject'],
          callback
        );
        break;
    }

  };

})();
