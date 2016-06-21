(function() {
  'use strict';
  angular
    .module('sxBi')
    .controller('AlcanceController', AlcanceController);

  function AlcanceController(calendariosService, alcanceService, $scope, $log) {
    //$log.info('Inicializando controlador AlcanceController');
    var vm = this;
    vm.data = {};
    activate();

    function activate() {
      vm.calendario = calendariosService.getCurrent();
      cargarAlcance();
      cargarAlcanceEspecial();
      cargarMargen();
    }

    $scope.$on('CALENDARIO_UPDATED', function() {
      $log.info('Calendario actualizado...');
      activate();
    });

    function cargarAlcance() {
      alcanceService.getAlcance(vm.calendario)
      .then( function(data) {
        vm.alcance = data;
        vm.totales = getTotales(data);
      })
      .catch( function(response) {
        $log.error('Http error status: ' + response.status);
        $log.error(response.statusText);
        $log.info('Error cargando inventarios....');
      });
    }
    
    function cargarAlcanceEspecial() {
      alcanceService.getAlcance(vm.calendario, false)
      .then( function(data) {
        vm.alcanceEspecial = data;
        vm.totalEspecial = getTotales(data);
        //$log.info('Totales: ' + angular.toJson(vm.totales));
      })
      .catch( function(response) {
        $log.error('Http error status: ' + response.status + ' ' + response.statusText);
        //$log.info('Error cargando inventarios....');
      });
    }

    function cargarMargen() {
      alcanceService.getMargen(vm.calendario)
      .then( function(data) {
        vm.margen = data;
      })
      .catch( function(response) {
        $log.error('Http error status: ' + response.status + ' ' + response.statusText);
      });
    }

    function getTotales(data) {
      var res = {
        mayorToneladas: data.sum(function (n) { return n.mayorToneladas; }),
        mayorProductos: data.sum(function (n) { return n.mayorProductos; }),
        mayorParticipacion: 100,
        mayorCosto: data.sum(function (n) { return n.mayorCosto; }),
        menorToneladas: data.sum(function (n) { return n.menorToneladas; }),
        menorProductos: data.sum(function (n) { return n.menorProductos; }),
        menorCosto: data.sum(function (n) { return n.menorCosto; }),
        menorDias1Nal: data.sum(function (n) { return n.menorDias1Nal; }),
        menorDias2Nal: data.sum(function (n) { return n.menorDias2Nal; }),
        menorDias1Imp: data.sum(function (n) { return n.menorDias1Imp; }),
        menorDias2Imp: data.sum(function (n) { return n.menorDias2Imp; }),

      };
      return res;
    }
  }
})();
