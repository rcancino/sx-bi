(function() {
  'use strict';
  /**
  * @desc Directiva para proporcionar una etiqueta con informacion del calendario activo
  * @example <div sx-calendario-info></div>
  */
  angular
  .module('sxBi')
  .directive('sxCalendarioInfo', calendarioInfo);

  function calendarioInfo() {
    var directive = {
      restrict: 'A',
      template: 'Semana: {{vm.$storage.currentCalendario.semana}} ({{vm.$storage.currentCalendario.fechaFinal | date:"dd/MM/yyyy"}})',
      controller: CalendarioController,
      controllerAs: 'vm',
      bindToController: false,
      scope: {}
    };
    return directive;
  }

  /** @ngInject */
  function CalendarioController($localStorage) {
    var vm = this;
    //$log.info('Controlador de directiva...');
    vm.$storage = $localStorage.$default({currentCalendario: {}});
  }

})();
