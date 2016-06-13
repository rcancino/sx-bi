(function() {
  'use strict';
  angular
    .module('sxBi')
    .factory('calendariosService', calendariosService);

  calendariosService.$inject = ['$http', '$localStorage'];

  function calendariosService ($http, $localStorage) {
    var service = {
      getCalendarios: getCalendarios,
      getCurrent: getCurrent,
      setCurrent: setCurrent
    };

    return service;

    function getCalendarios () {
      //var uri = Config.ENV.API_ENDPOINT + '/bi/calendarios';
      var uri = 'http://papel.dyndns-remote.com/api/bi/calendarios';
      /*
      return $http.get(uri)
        .then( function (response) {
          return response.data;
        }, function(response) {
          return response;
        });
        */
      return $http.get(uri);
    }

    function getCurrent () {
      return $localStorage.currentCalendario;
    }

    function setCurrent (cal) {
      $localStorage.currentCalendario = cal;
    }
  }

})();
