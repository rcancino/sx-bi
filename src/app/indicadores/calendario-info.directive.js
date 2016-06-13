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
      template: '<span>Semana: {{vm.$storage.currentCalendario.semana}} ({{vm.$storage.currentCalendario.fechaFinal | date:"dd/MM/yyyy"}})</span>',
      controller: CalendarioController,
      controllerAs: 'vm',
      bindToController: false,
      scope: {}
    };
    return directive;
  }

  CalendarioController.$inject = ['$localStorage'];

  function CalendarioController($localStorage) {
    var vm = this;
    //$log.info('Controlador de directiva...');
    vm.$storage = $localStorage.$default({currentCalendario: {}});
  }

})();
