(function() {
  'use strict';
  angular
    .module('sxBi')
    .factory('calendariosService', calendariosService);

  //calendariosService.$inject = ['$http', '$localStorage'];

  /** @ngInject */
  function calendariosService ($http, Config, $localStorage, $rootScope) {
    var service = {
      getCalendarios: getCalendarios,
      getCurrent: getCurrent,
      setCurrent: setCurrent
    };

    return service;

    function getCalendarios () {
      var uri = Config.API_ENDPOINT + '/bi/calendarios';
      return $http.get(uri);
    }

    function getCurrent () {
      return $localStorage.currentCalendario;
    }

    function setCurrent (cal) {
      $localStorage.currentCalendario = cal;
      $rootScope.$broadcast('CALENDARIO_UPDATED', cal);
    }
  }

})();
