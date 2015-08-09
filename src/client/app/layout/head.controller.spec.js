(function() {
  'use strict';

  describe('LayoutHeadController', function() {
    var $controller;

    beforeEach(module('layout'));

    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
    }));

    it('should run', function() {
      var controller = $controller('LayoutHeadController');
      expect(controller.pageTitle).toBe('your title here');


    });
  });
})();
