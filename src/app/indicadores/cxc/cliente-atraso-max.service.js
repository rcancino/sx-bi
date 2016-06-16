(function() {
  'use strict';
  angular
    .module('sxBi')
    .factory('ClienteAtrasoMax', ClienteAtrasoMax);

  /** @ngInject */
  function ClienteAtrasoMax($resource, Config) {
    var uri = Config.API_ENDPOINT + '/bi/clienteAtrasoMax';
    var res = $resource(uri,
      null,
      {
        'findByCalendario': { method: 'GET', isArray: false},
      });
    res.prototype.getKpi = function() {
      return 4.0;
    };
    res.prototype.getDesviacion = function() {
      var part = (this.atrasomas30 / this.saldo ) * 100;
      var desv = (this.getKpi() / part - 1);
      return desv * 100;
    };
    res.prototype.getCalifiacion = function() {
      var part = (this.atrasomas30 / this.saldo ) * 100;
      var desv = (this.getKpi() / part );
      return desv > 1 ? 2.5 : desv * 2.5;
    };

    return res;
  }
})();
