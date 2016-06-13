(function() {
  'use strict';
  angular
    .module('sxBi')
    .factory('PapelKpi', PapelKpi);

  PapelKpi.$inject = ['$resource', 'Config'];

  function PapelKpi($resource, Config) {
    var uri = Config.API_ENDPOINT + '/bi/papelKpis';
    var res = $resource(uri,
      null,
      {
        'findByCalendario': { method: 'GET', isArray: false}
      });

    res.prototype.getDiferenciaVentasTon = function(argument) {
      switch (argument) {
        case 'semanal':
          return (this.ventaSemanalTon - this.ventaSemanalTonMeta);
        case 'mensual':
          return (this.ventaMensualTon - this.ventaMensualTonMeta);
        case 'anual':
          return (this.ventaAnualTon - this.ventaAnualTonMeta);
        default:
          return 0.0;
      }
    };
    res.prototype.getDesviacionVentasTon = function(argument) {
      switch (argument) {
        case 'semanal':
          return ( (this.getDiferenciaVentasTon(argument) / this.ventaSemanalTon) * 100);
        case 'mensual':
          return ( (this.getDiferenciaVentasTon(argument) / this.ventaMensualTon) * 100);
        case 'anual':
          return ( (this.getDiferenciaVentasTon(argument) / this.ventaAnualTon) * 100);
        default:
          return 0.0;
      }
    };
    res.prototype.getUtilidad = function(argument) {
      switch (argument) {
        case 'semanal':
          return (this.ventaSemanal - this.costoSemanal);
        case 'mensual':
          return (this.ventaMensual - this.costoMensual);
        case 'anual':
          return (this.ventaAnual - this.costoAnual);
        default:
          return 0.0;
      }
    };
    res.prototype.getMargen = function(argument) {
      switch (argument) {
        case 'semanal':
          return   ( this.getUtilidad(argument) / this.costoSemanal) * 100;
        case 'mensual':
          return   ( this.getUtilidad(argument) / this.costoMensual) * 100;
        case 'anual':
          return   ( this.getUtilidad(argument) / this.costoAnual) * 100;
        default:
          return 0.0;
      }
    };
    res.prototype.getKpiMargen = function(argument) {
      switch (argument) {
        case 'semanal':
          var ps = ( (1 - (this.getDesviacionMargen(argument) * -1) / 100) * this.kpiSemanal );
          return ps > this.kpiSemanal ? this.kpiSemanal : ps;
        case 'mensual':
          var pm = ( (1 - (this.getDesviacionMargen(argument) * -1) / 100) * this.kpiMensual );
          return pm > this.kpiMensual ? this.kpiMensual : pm;
        case 'anual':
          var pa = ( (1 - (this.getDesviacionMargen(argument) * -1) / 100) * this.kpiAnual );
          return pa > this.kpiAnual ? this.kpiAnual : pa;
        default:
          return 0.0;
      }
    };
    res.prototype.getDesviacionMargen = function(argument) {
      return  this.getMargen(argument) - 19;
    };
    res.prototype.getKpiTotalMargen = function() {
      return this.getKpiMargen('semanal') + this.getKpiMargen('mensual') + this.getKpiMargen('anual');
    };
    res.prototype.getKpiVentas = function(argument) {
      switch (argument) {
        case 'semanal':
          var ps = ( (1 - (this.getDesviacionVentasTon(argument) * -1) / 100) * this.kpiSemanal );
          return ps > this.kpiSemanal ? this.kpiSemanal : ps;
        case 'mensual':
          var pm = ( (1 - (this.getDesviacionVentasTon(argument) * -1) / 100) * this.kpiMensual );
          return pm > this.kpiMensual ? this.kpiMensual : pm;
        case 'anual':
          var pa = ( (1 - (this.getDesviacionVentasTon(argument) * -1) / 100) * this.kpiAnual );
          return pa > this.kpiAnual ? this.kpiAnual : pa;
        default:
          return 0.0;
      }
    };
    res.prototype.getKpiTotalVentas = function() {
      return this.getKpiVentas('semanal') + this.getKpiVentas('mensual') + this.getKpiVentas('anual');
    };
    res.prototype.getCostoKg = function(argument) {
      switch (argument) {
        case 'semanal':
          return  (this.costoSemanal / this.ventaSemanalTon ) / 1000;
        case 'mensual':
          return  (this.costoMensual / this.ventaMensualTon ) / 1000;
        case 'anual':
          return  (this.costoAnual / this.ventaAnualTon ) / 1000;
        default:
          return 0.0;
      }
    };
    res.prototype.getPrecioKg = function(argument) {
      switch (argument) {
        case 'semanal':
          return  (this.ventaSemanal / this.ventaSemanalTon ) / 1000;
        case 'mensual':
          return  (this.ventaMensual / this.ventaMensualTon ) / 1000;
        case 'anual':
          return  (this.ventaAnual / this.ventaAnualTon ) / 1000;
        default:
          return 0.0;
      }
    };
    res.prototype.getMetaPrecioKg = function() {
      return 22.75;
    };

    res.prototype.getDesviacionPrecio = function(argument) {
      var dif = this.getPrecioKg(argument) / this.getMetaPrecioKg(argument) - 1;
      return dif * 100;
    };
    return res;
  }

})();
