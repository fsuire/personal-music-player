(function() {
  'use strict';

  angular
    .module('common.scroll')
    .directive('scroll', scrollDirective);

  scrollDirective.$inject = ['$document'];

  function scrollDirective($document) {

    var document = $document[0];

    return {
      restrict: 'E',
      link: function($scope, $element, attributes) {
        var element = $element[0];
        //element.parentElement.classList.add('scroll-parent');

        var scrollableElement = document.createElement('scrollable-element');

        /*angular.forEach(element.childNodes, function(child) {
          console.log(child);
          element.removeChild(child);
        });*/

        /*var children = [];
        for(var i in element.children) {
          var child = element.children[i];
          //element.removeChild(child);
          children.push(child);
        }

        angular.forEach(children, function(child) {
          console.log(child, child[0]);
          element.removeChild(child);
        });*/

        //element.removeChild(element.children[1]);

        while(element.children.length > 0) {
          var child = element.children[0];
          element.removeChild(child);
          scrollableElement.appendChild(child);
        }

        element.appendChild(scrollableElement);

      }
    };

  }

})();
