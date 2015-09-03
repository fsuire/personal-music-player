'use strict';

var path = require('path');
var args = require('minimist')(process.argv.slice(2));

global.gulp    = require('gulp');
global.plug    = require('gulp-load-plugins')({ lazy: false });

global.config  = require('./config');

global.ENV     = args.env || 'dev';
global.ROOT    = path.normalize(__dirname + '/..');
global.VERSION = args.version || require('../package.json').version;
global.PORT    = args.port || 4000;
global.SYNC    = args.sync ? true : false;

global.config.outputDir  += ENV + '/';
global.config.reportsDir += ENV + '/';
