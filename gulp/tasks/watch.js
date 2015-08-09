(function() {
  'use strict';

  // Watch changes and apply tasks

  var utils = require('../utils');
  var runSequence = require('run-sequence');

  exports.task = function() {
    console.log('watch ');
   gulp
      .watch(config.client.stylusFiles, function() {
        runSequence('stylus');
      })
      .on('change', utils.logWatch);

    gulp
      .watch(config.client.cssFiles, function() {
        runSequence('build', 'browsersync-reload');
      })
      .on('change', utils.logWatch);

    gulp
      .watch(config.client.jsFiles, function() {
        runSequence('karma', 'build', 'browsersync-reload');
      })
      .on('change', utils.logWatch);

    gulp
      .watch(config.client.jsDevFiles, function() {
        runSequence('karma');
      })
      .on('change', utils.logWatch);

    gulp
      .watch(config.client.htmlFiles, function() {
        runSequence('build');
      })
      .on('change', utils.logWatch);

  };

})();
