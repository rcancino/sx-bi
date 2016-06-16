(function() {
  'use strict';
  angular
    .module('sxBi')
    .factory('alcanceService', alcanceService);

  /** @ngInject */
  function alcanceService($http, $log, Config) {
    var service = {
      getAlcance: getAlcance,
      getMargen: getMargen
    };
    return service;

    function getAlcance (calendario, deLinea) {
      var uri = Config.API_ENDPOINT + '/bi/inventarioAlcance';
      return $http.get(uri, {params: {calendarioId: calendario.id, deLinea: deLinea }})
        .then( function (response) {
          return response.data;
        });
    }

    function getMargen (calendario) {
      var uri = Config.API_ENDPOINT + '/bi/inventarioMargenSemanal';
      return $http.get(uri,
        {
          params: {
            semana: calendario.semana,
            ejercicio: calendario.year
          }
        })
        .then( function (response) {
          return response.data;
        });
    }
  }
})();
