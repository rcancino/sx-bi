(function() {
  'use strict';

  angular
    .module('sxBi')
    .controller('IndicadoresController', IndicadoresController);

  /** @ngInject */
  function IndicadoresController($uibModal, $log) {
    var vm = this;
    vm.seleccionar = seleccionar;
    activate();

    function activate() {
      $log.info('Activando Indicadores controller');
    }

    function seleccionar() {
      var modal = $uibModal.open( {
        animation: true,
        templateUrl: 'app/indicadores/calendarios.html',
        controller: 'CalendariosController'
      });

      modal.result.then( function() {
        /*
        Movimiento.remove({id: movimiento.id}, movimiento, function(mov) {
          toastr.warning('Movimiento de cuenta eliminado: ' + mov, 'Eliminación exitosa');
          vm.movimientos = Movimiento.query();
        }, function(response) {
          toastr.error(angular.toJson(response), 'Error al tratar de eliminar', {closeButton: true, extendedTimeOut: 0, timeOut: 0});
        });
        */
      });
    }
  }
})();
