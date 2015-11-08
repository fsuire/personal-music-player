(function() {
  'use strict';

  angular
    .module('common.drag-and-drop')
    .directive('commonDraganddrop', commonDraganddropDirective);

  commonDraganddropDirective.$inject = [];

  function commonDraganddropDirective() {

    return {
      restrict: 'A',
      scope: {
        commonDragenter: '&',
        commonDragover: '&',
        commonDrop: '&',
        dragleave: '&'
      },
      controller: CommonDragoverController,
      bindToController: true,
      controllerAs: 'commonDragoverController'
    };
  }

  CommonDragoverController.$inject = ['$element', '$document'];

  function CommonDragoverController($element, $document) {
    var vm = this;

    var element = $element[0];
    var body = $document[0].querySelector('body');

    element.addEventListener('dragenter', function(event) {
      if(angular.isFunction(vm.commonDragenter)) {
        vm.commonDragenter(event);
      }
      body.classList.add('common-dragging');
      event.stopPropagation();
      event.preventDefault();
    });

    element.addEventListener('dragover', function(event) {
      if(angular.isFunction(vm.commonDragover)) {
        vm.commonDragover(event);
      }
      if(!body.classList.contains('common-dragging')) {
        body.classList.add('common-dragging');
      }
      event.stopPropagation();
      event.preventDefault();
    });

    element.addEventListener('drop', function(event) {
      if(angular.isFunction(vm.commonDrop)) {
        vm.commonDrop(event);
      }
      body.classList.remove('common-dragging');
      event.stopPropagation();
      event.preventDefault();
    });

    element.addEventListener('dragleave', function(event) {
      if(angular.isFunction(vm.commonDragleave)) {
        vm.commonDragleave(event);
      }
      body.classList.remove('common-dragging');
      event.stopPropagation();
      event.preventDefault();
    });
  }

})();
