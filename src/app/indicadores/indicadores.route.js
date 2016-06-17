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
      })
      .state('index.indicadores.resumen.precioPorKilo', {
        url: '/resumen/precioPorKilo',
        templateUrl: 'app/indicadores/precioPorKilo/precio-por-kilo.html',
        controller: 'PrecioPorKiloController',
        controllerAs: 'vm'
      })
      .state('index.indicadores.resumen.tickets', {
        url: '/resumen/tickets',
        templateUrl: 'app/indicadores/tickets/tickets.html',
        controller: 'TicketsController',
        controllerAs: 'vm'
      })
      .state('index.indicadores.ventas', {
        url: '/ventas',
        templateUrl: 'app/indicadores/ventas/ventas.html',
        //controller: 'ResumenController',
        //controllerAs: 'vm'
      })
      .state('index.indicadores.ventas.toneladas', {
        url: '/toneladas',
        templateUrl: 'app/indicadores/ventas/toneladas.html',
        controller: 'PapelKpiVentasController',
        controllerAs: 'vm'
      })
      .state('index.indicadores.ventas.margen', {
        url: '/toneladas',
        templateUrl: 'app/indicadores/ventas/margen.html',
        controller: 'PapelKpiVentasController',
        controllerAs: 'vm'
      })
      .state('index.indicadores.ventas.tickets', {
        url: '/toneladas',
        templateUrl: 'app/indicadores/ventas/tickets.html',
        controller: 'PapelKpiVentasController',
        controllerAs: 'vm'
      })
      .state('index.indicadores.atrasoMaximo', {
        url: '/atrasoMaximo',
        templateUrl: 'app/indicadores/cxc/atraso-maximo.html',
        controller: 'AtrasoMaximoController',
        controllerAs: 'vm'
      })
      .state('index.indicadores.juridico', {
        url: '/juridico',
        templateUrl: 'app/indicadores/cxc/juridico.html',
        controller: 'JuridicoController',
        controllerAs: 'vm'
      })
      .state('index.indicadores.inventarios', {
        url: '/inventarios',
        templateUrl: 'app/indicadores/inventarios/inventarios.html',
        controller: 'InventariosController',
        controllerAs: 'vm'
      })
      .state('index.indicadores.alcanceMayor', {
        url: '/alcanceMayor',
        templateUrl: 'app/indicadores/alcance/alcance-mayor.html',
        controller: 'AlcanceController',
        controllerAs: 'vm'
      });

  }

})();
