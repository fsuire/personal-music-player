'use strict';

var IoC = require('electrolyte');

IoC.loader(IoC.node_modules());
IoC.loader(IoC.node(process.env.DIST_ROOT + 'server'));

try {
  //IoC.create('server');
  IoC.create('common/mplayer/mplayer');
  IoC.create('common/socketIo/socketIo');
} catch(error) {
  console.log('---> ERROR !');
  console.log(error);
}
