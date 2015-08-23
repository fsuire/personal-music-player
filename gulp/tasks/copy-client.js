(function() {
  'use strict';

  // Copy client code from src to the outputDir

  var runSequence = require('run-sequence');

  exports.task = function(callback) {
    var clientFiles = config.client.cssFiles
      .concat(config.client.fontFiles)
      .concat(config.client.htmlFiles)
      .concat(config.client.jsFiles);
    var outputDir = config.outputDir + config.clientDir;

    return gulp
      .src(clientFiles)
      .pipe(plug.newer(outputDir))
      .pipe(gulp.dest(outputDir));

    runSequence(
      ['copy-css', 'copy-fonts', 'copy-html', 'copy-js-client'],
      callback
    );

  };

})();
