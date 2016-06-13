(function() {
  'use strict';

  angular
    .module('sxBi')
    .controller('CalendariosController', CalendariosController);

  /** @ngInject */
  function CalendariosController($scope, $uibModalInstance, calendariosService, $log) {
    activate();

    $scope.ok = function () {
      $uibModalInstance.close('ok');
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.seleccionar = function(calendario) {
      calendariosService.setCurrent(calendario);
      $scope.calendario = calendario;
      $uibModalInstance.close('ok');
    };

    function activate() {
      $scope.calendario = calendariosService.getCurrent();
      calendariosService.getCalendarios()
      .then(function(response) {
        $scope.calendarios = response.data;
      })
      .catch(function(response) {
        $scope.httpError = {
          statusText: 'Error de conexión: ' + response.statusText,
          status: response.status
        };
        $log.error('Error de conexion al servidor: ' + response.statusText);
      });
    }
  }
})();
