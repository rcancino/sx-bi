(function() {
  'use strict';
  angular
    .module('sxBi')
    .factory('inventariosService', inventariosService);

  /** @ngInject */
  function inventariosService($http, $log, Config) {
    var service = {
      getInventarios: getInventarios,
      getPedidosPendientes: getPedidosPendientes,
      getComprobacion: getComprobacion
    };
    return service;

    function getInventarios (calendario) {
      var uri = Config.API_ENDPOINT + '/bi/inventarioSucursal';
      return $http.get(uri, {params: {calendarioId: calendario.id}})
        .then( function (response) {
          return response.data;
        });
    }

    function getPedidosPendientes (calendario) {
      var uri = Config.API_ENDPOINT + '/bi/pedidoPorLlegar';
      return $http.get(uri, {params: {calendarioId: calendario.id}})
        .then( function (response) {
          return response.data;
        });
    }

    function getComprobacion (calendario) {
      var uri = Config.API_ENDPOINT + '/bi/comprobacionDeInventario';
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
