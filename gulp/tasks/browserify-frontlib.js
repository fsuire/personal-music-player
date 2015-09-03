(function() {
  'use strict';

  // Copy client js code from src to the outputDir

  var fs = require('fs');

  exports.task = function() {
    var packageJson = JSON.parse(
      fs.readFileSync('package.json')
    );

    if(packageJson.frontlib) {
      return gulp.src(packageJson.frontlib)
        .pipe(plug.browserify({
          insertGlobals : true,
          debug: true
        }))
        .pipe(gulp.dest(config.browserifyFrontlibOutputDir));
    }
  };

})();
