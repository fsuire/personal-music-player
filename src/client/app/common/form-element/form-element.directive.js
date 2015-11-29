(function() {
  'use strict';

  angular
    .module('common.form-element')
    .directive('formElement', formElementDirective);

  formElementDirective.$inject = [];

  function formElementDirective() {

    return {
      restrict: 'E',
      //templateUrl: 'app/common/form-element/form-element.html',
      scope: {
        label: '@',
        ngModel: '='
      },
      require: '^form',
      link: function($scope, $element, attributes, form) {
        $scope.form = form;
      },
      controller: FormElementDirectiveController,
      bindToController: true,
      controllerAs: 'formElement'
    };

  }

  FormElementDirectiveController.$inject = ['$scope', '$http', '$compile', '$element'];

  function FormElementDirectiveController($scope, $http, $compile, $element) {
    var vm = this;

    var element = $element[0];
    var originalContent = [];
    vm.elementname = '';
    vm.element = {};

    for(var e in element.children) {
      if(typeof element.children[e] === 'object') {
        var el = element.children[e];
        originalContent.push(el);
        if(el.hasAttribute('name')) {
          vm.elementname = el.getAttribute('name');
        }
      }
    }
    //vm.error = $scope.form[vm.elementname].$error;

    $http
      .get('app/common/form-element/form-element.html')
      .then(function(response) {
        var content = $compile(response.data)($scope);
        for(var e in content) {
          if(typeof element.children[e] === 'object') {
            element.appendChild(content[e]);
          }
        }
        var elementLine = element.querySelector('element-line');
        for(var e in originalContent) {
          elementLine.appendChild(originalContent[e]);
        }
      });

    $scope.$watch(function() {
      return $scope.form[vm.elementname];
    }, function(newValue) {
      vm.element = newValue;
    });

  }

})();
