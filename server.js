'use strict';

var IoC = require('electrolyte');

IoC.loader(IoC.node_modules());
IoC.loader(IoC.node(process.env.DIST_ROOT + 'server'));

try {
  IoC.create('server');
} catch(error) {
  console.log('---> ERROR !');
  console.log(error);
}
