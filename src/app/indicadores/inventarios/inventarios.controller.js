(function() {
  'use strict';
  angular
    .module('sxBi')
    .controller('InventariosController', InventariosController);

  /** @ngInject */
  function InventariosController(calendariosService, inventariosService, $scope, $log) {
    $log.info('Inicializando controlador InventariosController');
    var vm = this;
    activate();

    function activate() {
      vm.calendario = calendariosService.getCurrent();
      cargarInventarios();
      cargarPendientes();
      cargarComprobacion();
    }

    $scope.$on('CALENDARIO_UPDATED', function() {
      $log.info('Calendario actualizado...');
      activate();
    });

    function cargarInventarios() {
      inventariosService.getInventarios(vm.calendario)
      .then( function(data) {
        vm.inventarios = data;
        vm.totales = getTotales(data);
      })
      .catch( function(response) {
        $log.error('Http error status: ' + response.status);
        $log.error(response.statusText);
        $log.info('Error cargando inventarios....');
      });
    }

    function cargarPendientes() {
      inventariosService.getPedidosPendientes(vm.calendario)
      .then( function(data) {
        vm.pendientes = data;
        vm.pedidosTotales = getTotalesPendientes(data);
      })
      .catch( function(response) {
        $log.error('Http error status: ' + response.status);
        $log.error(response.statusText);
        $log.info('Error cargando pedidos pendientes por llegar....');
      });
    }

    function cargarComprobacion() {
      inventariosService.getComprobacion(vm.calendario)
      .then( function(data) {
        vm.comprobacion = data;
      })
      .catch( function(response) {
        $log.error('Http error status: ' + response.status);
        $log.error(response.statusText);
        $log.info('Error cargando pedidos pendientes por llegar....');
      });
    }


    function getTotales(data) {
      var res = {
        toneladas: data.sum(function (n) { return n.toneladas; }),
        participacion: 100,
        costo: data.sum(function (n) { return n.costo; })
      };
      return res;
    }

    function getTotalesPendientes(data) {
      var res = {
        toneladas: data.sum(function (n) { return n.toneladas; }),
        pedidos: data.sum(function (n) { return n.pedidos; })
      };
      return res;
    }
  }
})();
