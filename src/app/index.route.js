(function() {
  'use strict';

  angular
    .module('sxKernell')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('index', {
        url: '/',
        abstract: false,
        templateUrl: 'app/main/content.html'
      })
      .state('index.home', {
        url: 'inicio',
        templateUrl: 'app/main/home.html'
      });
    $urlRouterProvider.otherwise('/inicio');
  }

})();
