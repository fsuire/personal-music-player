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
    vm.isRequired = false;
    vm.hasErrors = false;

    for(var e in element.children) {
      if(typeof element.children[e] === 'object') {
        var el = element.children[e];
        originalContent.push(el);
        if(el.hasAttribute('name')) {
          vm.elementname = el.getAttribute('name');
        }
        if(el.hasAttribute('required')) {
          vm.isRequired = true;
        }
      }
    }

    $http
      .get('app/common/form-element/form-element.html')
      .then(function(response) {
        var content = $compile(response.data)($scope);
        for(var contentElement in content) {
          if(typeof element.children[contentElement] === 'object') {
            element.appendChild(content[contentElement]);
          }
        }
        var elementLine = element.querySelector('element-line');
        for(var originalElement in originalContent) {
          elementLine.appendChild(originalContent[originalElement]);
        }
      });

    $scope.$watchCollection(function() {
      return $scope.form[vm.elementname];
    }, function(newValue) {
      vm.element = newValue;
      vm.hasErrors = !!Object.keys(newValue.$error).length;
    });

  }

})();
