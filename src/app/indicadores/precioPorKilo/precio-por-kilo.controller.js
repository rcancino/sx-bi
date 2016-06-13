(function() {
  'use strict';

  angular
    .module('sxBi')
    .controller('PrecioPorKiloController', PrecioPorKiloController);

  /** @ngInject */
  function PrecioPorKiloController(calendariosService, $log, PapelKpi) {
    var vm = this;
    activate();

    function activate() {
      vm.calendario = calendariosService.getCurrent();
      vm.indicador = PapelKpi.findByCalendario({calendarioId: vm.calendario.id});
      $log.info('Activando: PrecioPorKiloController... calendario: ' + vm.calendario);
    }
  }
})();
