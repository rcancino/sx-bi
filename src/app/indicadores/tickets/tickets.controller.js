(function() {
  'use strict';

  angular
    .module('sxBi')
    .controller('TicketsController', TicketsController);

  /** @ngInject */
  function TicketsController(calendariosService, $log, PapelKpi) {
    var vm = this;
    activate();

    function activate() {
      vm.calendario = calendariosService.getCurrent();
      vm.indicador = PapelKpi.findByCalendario({calendarioId: vm.calendario.id});
      $log.info('Activando: TicketsController... calendario: ' + vm.calendario);
    }
  }
})();
