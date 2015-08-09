(function() {
  'use strict';

  var browserSync = require('browser-sync');

  exports.task = function() {
    browserSync({
      server: {
        baseDir: './' + config.outputDir + config.clientDir,
        routes: {
            "/bower_components": "./bower_components"
        }
      }
    });

  };

})();
