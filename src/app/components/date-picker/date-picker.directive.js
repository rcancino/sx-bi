(function() {
  'use strict';

  angular
    .module('sxKernell')
    .directive('sxDatePicker', datePicker);

  /** @ngInject */
  function datePicker() {
    var directive = {
      restrict: 'E',
      replace: true,
      scope: {
        id: '@',
        name: '@',
        model: '=',
        format: '@',
        required: '@',
        options: '='
      },
      templateUrl: 'app/components/date-picker/date-picker.html',
      controller: controller
    };
    return directive;

    /** @ngInject */
    function controller($scope) {
      $scope.opened = false;

      $scope.open = function() {
        $scope.opened = true;
      };

      // $scope.dateOptions = {
      //     formatYear: 'yy',
      //     maxDate: new Date(2016, 5, 22),
      //     minDate: new Date(),
      //     startingDay: 1
      // };
    }

  }
})();

