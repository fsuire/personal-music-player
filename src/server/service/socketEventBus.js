(function() {
  'use strict';

  module.exports = socketEventBus;

  socketEventBus['@singleton'] = true;
  socketEventBus['@require'] = ['events'];

  function socketEventBus(events) {

    return new events.EventEmitter();
  }

})();
