'use strict';

module.exports = {
  server: {},
  client: {
    cssFiles: [
      'src/client/**/*.css'
    ],
    fontFiles: [
      'src/client/**/*.eot',
      'src/client/**/*.woff',
      'src/client/**/*.ttf',
      'src/client/**/*.svg'
    ],
    stylusFiles: [
      'src/client/app/**/*.styl'
    ],
    htmlFiles: [
      'src/client/**/*.html'
    ],
    indexHtmlFile: 'src/client/index.html',
    jsFiles: [
      'src/client/**/*.module.js',
      'src/client/**/*.js',
      '!src/client/**/*.old.js',
      //'!src/client/**/*.mock.js',
      '!src/client/**/*.spec.js'
    ],
    jsDevFiles: [
      //'src/client/**/*.mock.js',
      'src/client/**/*.spec.js'
    ],
    styleDir: 'client/assets/styles/',
    scriptDir: 'client/assets/scripts/',
    templateFiles: [
      'src/client/app/**/*.html'
    ]
  },
  clientDir: 'client/',
  outputDir: 'dist/',
  reportsDir: 'reports/',
  serverDir: 'server/',
  sourceDir: 'src/'
};
