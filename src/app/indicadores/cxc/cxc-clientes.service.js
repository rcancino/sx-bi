(function() {
  'use strict';
  angular
    .module('sxBi')
    .factory('cxcClientes', cxcClientes);

  /** @ngInject */
  function cxcClientes($http, $log, Config) {
    var service = {
      getClientes: getClientes,
      getClientesJuridico: getClientesJuridico
    };
    return service;

    function getClientes (calendario, deLinea) {
      var uri = Config.API_ENDPOINT + '/bi/clienteAtrasoMax';
      return $http.get(uri, {params: {calendarioId: calendario.id, deLinea: deLinea }})
        .then( function (response) {
          return response.data;
        });
    }

    function getClientesJuridico (calendario) {
      var uri = Config.API_ENDPOINT + '/bi/juridico';
      return $http.get(uri, {params: {semana: calendario.semana, ejercicio: calendario.year}})
        .then( function (response) {
          return response.data;
        });
    }

  }
})();
