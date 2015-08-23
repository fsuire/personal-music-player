(function() {
  'use strict';

  // Watch changes and apply tasks

  var utils = require('../utils');
  var runSequence = require('run-sequence');

  exports.task = function() {

   gulp
      .watch(config.client.stylusFiles, function() {
        runSequence('stylus');
      })
      .on('change', utils.logWatch);

    gulp
      .watch(config.client.cssFiles, function() {
        if(ENV === 'dev' || ENV === 'development') {
          runSequence('copy-css', 'browsersync-reload');
        } else {
          runSequence('build', 'browsersync-reload');
        }
      })
      .on('change', utils.logWatch);

    gulp
      .watch(config.client.jsFiles, function() {
        if(ENV === 'dev' || ENV === 'development') {
          runSequence('karma', 'copy-js-client', 'browsersync-reload');
        } else {
          runSequence('karma', 'build', 'browsersync-reload');
        }
      })
      .on('change', utils.logWatch);

    gulp
      .watch(config.client.htmlFiles, function() {
        if(ENV === 'dev' || ENV === 'development') {
          runSequence('karma', 'copy-html', 'browsersync-reload');
        } else {
          runSequence('karma', 'build', 'browsersync-reload');
        }
      })
      .on('change', utils.logWatch);

    gulp
      .watch(config.server.jsFiles, function() {
        runSequence('build');
      })
      .on('change', utils.logWatch);

  };

})();
