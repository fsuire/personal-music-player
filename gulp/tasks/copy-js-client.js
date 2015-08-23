(function() {
  'use strict';

  // Copy client js code from src to the outputDir

  exports.task = function() {
    var outputDir = config.outputDir + config.clientDir;

    return gulp
      .src(config.client.jsFiles)
      .pipe(plug.newer(outputDir))
      .pipe(gulp.dest(outputDir));
  };

})();
