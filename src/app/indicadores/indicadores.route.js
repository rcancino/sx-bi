(function() {
  'use strict';

  angular
    .module('sxBi')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('index.indicadores', {
        url: 'indicadores',
        templateUrl: 'app/indicadores/indicadores.html',
        controller: 'IndicadoresController',
        controllerAs: 'vm'
      })
      .state('index.indicadores.resumen', {
        url: '/resumen',
        templateUrl: 'app/indicadores/resumen.html',
        controller: 'ResumenController',
        controllerAs: 'vm'
      })
      .state('index.indicadores.resumen.calificacion', {
        url: '/calificacion/:calificacionId/{:tipo}',
        templateUrl: 'app/indicadores/calificacion.html',
        controller: 'CalificacionController',
        controllerAs: 'vm'
      });
  }

})();
