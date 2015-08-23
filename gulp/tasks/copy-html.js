(function() {
  'use strict';

  // Copy client html code from src to the outputDir

  exports.task = function() {
    var outputDir = config.outputDir + config.clientDir;

    return gulp
      .src(config.client.htmlFiles)
      .pipe(plug.newer(outputDir))
      .pipe(gulp.dest(outputDir));
  };

})();
