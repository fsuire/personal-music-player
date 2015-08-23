(function() {
  'use strict';

  // Copy client css code from src to the outputDir

  exports.task = function() {
    var outputDir = config.outputDir + config.clientDir;

    return gulp
      .src(config.client.cssFiles)
      .pipe(plug.newer(outputDir))
      .pipe(gulp.dest(outputDir));
  };

})();
