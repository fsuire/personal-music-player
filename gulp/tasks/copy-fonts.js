(function() {
  'use strict';

  // Copy client fonts from src to the outputDir

  exports.task = function() {
    var outputDir = config.outputDir + config.clientDir;

    return gulp
      .src(config.client.fontFiles)
      .pipe(plug.newer(outputDir))
      .pipe(gulp.dest(outputDir));
  };

})();
