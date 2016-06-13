(function() {
  'use strict';
  angular
    .module('sxBi')
    .factory('Calificacion', Calificacion);

  /** @ngInject */
  function Calificacion($http, Config, $log) {

    var service = {
      getCalificaciones: getCalificaciones,
      getPartidas: getPartidas
    };
    return service;

    function getCalificaciones(calendario) {
      var uri = Config.API_ENDPOINT + '/bi/calificaciones';
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

    function getPartidas(calificacionId) {
      var uri = Config.API_ENDPOINT + '/bi/calificaciones/' + calificacionId + '/partidas';
      return $http.get(uri)
        .then( function(response) {
          return response.data;
        }, function(response) {
          $log.error(angular.toJson(response));
        });
    }
  }

})();
