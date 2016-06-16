(function () {
  'use strict';
  angular
    .module('sxBi')
    .controller('JuridicoController', JuridicoController);

  /** @ngInject */
  function JuridicoController ($log, calendariosService, cxcClientes) {
    var vm = this;
    activate();

    function activate () {
      $log.info('Activando controlador:  JuridicoController...');
      cargarClientesJuridico();
    }

    function cargarClientesJuridico() {
      vm.calendario = calendariosService.getCurrent();
      cxcClientes.getClientesJuridico(vm.calendario)
      .then( function(data) {
        vm.clientesJuridico = data;
        vm.totalJuridico = getTotalJuridico(vm.clientesJuridico);
      })
      .catch( function(response) {
        $log.error('Http error status: ' + response.status);
        $log.error(response.statusText);
      });
    }

    function getTotalJuridico (rows) {
      var res = {
        saldo: 0,
        mes1: 0,
        mes2: 0,
        mes3: 0,
        pago: 0,
      };
      rows.forEach( function (item) {
        res.saldo += item.saldo;
        res.mes1 += item.mes1;
        res.mes2 += item.mes2;
        res.mes3 += item.mes3;
        res.pago += item.pago;
      });
      return res;
    }
  }
})();
