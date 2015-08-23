(function() {
  'use strict';

  var browserSync = require('browser-sync');

  exports.task = function() {
    browserSync({
      //server: {
        //files: './' + config.outputDir + config.clientDir,
        //files: ['./' + config.outputDir + config.clientDir + '**/*.*'],
        /*routes: {
            "/bower_components": "./bower_components"
        }*/
        proxy: 'localhost:' + PORT,
        port: 3000
      //}
    });

  };

})();
