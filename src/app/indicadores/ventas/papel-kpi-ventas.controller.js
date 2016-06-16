(function() {
  'use strict';
  angular
    .module('sxBi')
    .controller('PapelKpiVentasController', PapelKpiVentasController);

  /** @ngInject */
  function PapelKpiVentasController($scope, $log, calendariosService, papelKpiVenta) {
    var vm = this;
    vm.options = {};
    vm.data = {};
    activate();

    function activate() {
      $log.info('Inicializando controlador PapelKpiVentasController');
      cargarVentas();
      $scope.$on('CALENDARIO_UPDATED', function() {
        $log.info('Calendario actualizado...');
        cargarVentas();
      });
    }

    function cargarVentas() {
      vm.calendario = calendariosService.getCurrent();
      papelKpiVenta.getVentas(vm.calendario)
      .then( function(data) {
        vm.ventasPorCalendario = data;
        vm.ventasPorSemana = data.ventasPorSemana;
        vm.resumenPorSemana = data.resumenPorSemana;
      })
      .catch( function(response) {
        $log.error('Http error status: ' + response.status);
        $log.error(response.statusText);
        $log.info('Error cargando ventas....');
      });
    }
  }

})();
