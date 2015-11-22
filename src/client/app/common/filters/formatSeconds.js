(function() {
  'use strict';

  angular
    .module('common.filters')
    .filter('formatSeconds', formatSecondsFilter);

  formatSecondsFilter.$inject = [];

  function formatSecondsFilter() {
    return function(input) {
      var seconds = parseInt(input);

      var minutes = seconds / 60;
      var floorMinutes = Math.floor(minutes);
      seconds = Math.floor((minutes - floorMinutes) * 60);

      if(floorMinutes < 60) {
        return __prefix0(floorMinutes) + ':' + __prefix0(seconds);
      }

      var hours = floorMinutes / 60;
      var floorHours = Math.floor(hours);
      floorMinutes = Math.floor((hours - floorHours) * 60);

      return __prefix0(floorHours) + ':' + __prefix0(floorMinutes) + ':' + __prefix0(seconds);

      function __prefix0(what) {
        if(what < 10) {
          what = '0' + what;
        }
        return what;
      }
    };
  }

})();
