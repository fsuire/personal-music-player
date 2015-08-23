(function() {
  'use strict';

  // Compile *.styl

  var nib = require('nib');

  exports.task = function() {
    var compress = true;
    if(ENV === 'dev' || ENV === 'development') {
      compress = false;
    }

    return gulp
      .src(config.client.stylusMainFile)
      .pipe(plug.stylus({
        use: nib(),
        compress: compress
      }))
      .pipe(gulp.dest('src/' + config.client.styleDir));
  };

})();
