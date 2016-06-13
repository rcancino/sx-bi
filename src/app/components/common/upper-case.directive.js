(function() {
  'use strict';

  angular
  .module('sxKernell')
  .directive('sxUpperCase', upperCase);

  /** @ngInject */
  function upperCase() {

    var directive = {
      restrict: 'A',
      require: 'ngModel',
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, element, attrs, ctrl) {


      element.on('keyup', function(e) {

        var char = e.char || String.fromCharCode(e.charCode);
        if (!/^[A-Z0-9]$/i.test(char)) {
          e.preventDefault();
          return false;
        }
      });
      ctrl.$formatters.push(formatter);
      ctrl.$parsers.push(parser);

      function parser(value) {
        if (ctrl.$isEmpty(value)) {
          return value;
        }
        var formatedValue = value.toUpperCase();
        if (ctrl.$viewValue !== formatedValue) {
          ctrl.$setViewValue(formatedValue);
          ctrl.$render();
        }
        return formatedValue;
      }

      function formatter(value) {
        if (ctrl.$isEmpty(value)) {
          return value;
        }
        return value.toUpperCase();
      }
    }
  }

})();
