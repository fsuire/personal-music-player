'use strict';

global.ROOT_PATH = process.cwd();

process.on('uncaughtException', function(error) {
  console.error('');
  console.error('----- PROCESS UNCAUGHT EXCEPTION -----');
  console.error(error);
  console.error('--------------------------------------');
  console.error('');
  switch(error.code) {
    case 'ECONNRESET':
      break;
    default:
      process.exit(error.code);
      break;
  }
});

var IoC = require('electrolyte');

IoC.loader(IoC.node_modules());
IoC.loader(IoC.node(process.env.DIST_ROOT + 'server'));

try {
  //IoC.create('server');
  IoC.create('common/mplayer/mplayer');
  //IoC.create('common/socketIo/socketIo');
} catch(error) {
  console.log('---> ERROR !');
  console.log(error);
}
