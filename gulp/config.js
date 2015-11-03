'use strict';

module.exports = {
  server: {
    jsFiles: [
      'src/server/**/*.js',
      'src/server/**/*.json',
      '!src/server/**/*.spec.js'
    ],
    jsDevFiles: [
      'src/server/**/*.spec.js'
    ]
  },
  client: {
    imagesFiles: [
      'src/client/**/*.png',
      'src/client/**/*.svg',
      'src/client/**/*.jpg'
    ],
    cssFiles: [
      'src/client/**/*.css'
    ],
    fontFiles: [
      'src/client/**/*.eot',
      'src/client/**/*.woff',
      'src/client/**/*.ttf',
      'src/client/**/*.svg'
    ],
    stylusMainFile: 'src/client/app/app.styl',
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
  sourceDir: 'src/',
  browserifyFrontlibOutputDir: 'browserify_frontlib/'
};
