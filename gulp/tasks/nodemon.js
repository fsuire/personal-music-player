(function() {
  'use strict';

  var nodemon = require('gulp-nodemon');
  var browserSync = require('browser-sync');

  exports.task = function(callback) {

    var started = false;

    return nodemon({
      script: 'server.js',
      //ext: 'js html',
      env: {
        'ENV': ENV,
        'DIST_ROOT': 'dist/' + ENV + '/',
        'PORT': PORT
      },
      watch: [
        'dist/' + ENV + '/server/'
      ],
      ignore: [
        'dist/' + ENV + '/**/*.css'
      ]
    })
      .on('start', function() {
        if(!started) {
          started = true;
          callback();
        }
      })
      .on('restart', function() {
        setTimeout(function reload() {
          browserSync.reload({
            stream: false   //
          });
        }, 500);
      });

  };

})();
