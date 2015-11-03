(function() {
  'use strict';

  // Copy client html code from src to the outputDir

  exports.task = function() {
    var outputDir = config.outputDir + config.clientDir + 'assets/';

    return gulp
      .src(config.client.imagesFiles)
      .pipe(plug.newer(outputDir))
      .pipe(gulp.dest(outputDir));
  };

})();
