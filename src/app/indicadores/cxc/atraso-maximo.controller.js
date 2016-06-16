(function () {
  'use strict';
  angular
    .module('sxBi')
    .controller('AtrasoMaximoController', AtrasoMaximoController);

  /** @ngInject */
  function AtrasoMaximoController ($log, calendariosService, cxcClientes, ClienteAtrasoMax, $filter) {
    var vm = this;
    vm.print = print;
    var currency = $filter('currency');
    activate();

    function activate () {
      $log.info('Activando controlador:  AtrasoMaximoController...');
      cargarClientes();
    }

    function cargarClientes() {
      vm.calendario = calendariosService.getCurrent();
      cxcClientes.getClientes(vm.calendario)
      .then( function(data) {
        vm.clientes = data;
        vm.total = getTotal(data);
      })
      .catch( function(response) {
        $log.error('Error cargando clientes con atraso maximo....');
        $log.error('Http error status: ' + response.status + ' ' + response.statusText);
      });
      vm.gtotal = ClienteAtrasoMax
      .findByCalendario({
        calendarioId: vm.calendario.id,
        clave: 'TOTAL'
      });
    }

    function getTotal (rows) {
      var res = {
        facturas: 0,
        saldo: 0,
        porVencer: 0,
        vencido: 0,
        atraso1a30: 0,
        atraso31a60: 0,
        atraso61a90: 0,
        atrasomas91: 0
      };
      rows.forEach( function (item) {
        res.facturas += item.facturas;
        res.saldo += item.saldo;
        res.porVencer += item.porVencer;
        res.vencido += item.vencido;
        res.atraso1a30 += item.atraso1a30;
        res.atraso31a60 += item.atraso31a60;
        res.atraso61a90 += item.atraso61a90;
        res.atrasomas91 += item.atrasomas91;
      });
      return res;
    }

    function createDocumentDefinition(calendario, rows) {
      var tot = vm.gtotal;
      var items = [];
      if (rows) {
        var items2 = rows.map(function(item) {
          return [
            item.clave,
            item.nombre,
            item.plazo.toString(),
            item.lineaCredito.toString(),
            item.facturas.toString(),
            item.atrasoMax.toString(),
            item.saldo.toString(),
            item.porVencer.toString(),
            item.vencido.toString(),
            item.atraso1a30.toString(),
            item.atraso31a60.toString(),
            item.atraso61a90.toString(),
            item.atrasomas91.toString()
          ];
        });
        items = items.concat(items2);
        if (vm.total) {
          items.push([
            'Total',
            '',
            '',
            '',
            vm.total.facturas.toString(),
            '',
            currency(vm.total.saldo),
            currency(vm.total.porVencer),
            currency(vm.total.vencido),
            currency(vm.total.atraso1a30),
            currency(vm.total.atraso31a60),
            currency(vm.total.atraso61a90),
            currency(vm.total.atrasomas91)]);
        }
      }
      var fecha = new Date(calendario.fechaFinal).addDays(-1);
      var dd = {
        pageSize: 'LETTER',
        pageOrientation: 'landscape',
        pageMargins: [ 10, 10, 10, 10 ],
        content: [
          { text: 'PAPEL S.A. de C.V', style: 'header'},
          {
            columns: [
              {
                fontSize: 16,
                alignment: 'left',
                text: fecha.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
              },
              {
                fontSize: 16,
                alignment: 'left',
                text: 'Semana ' + calendario.semana
              }
            ]
          },
          {
            style: 'itemsTable',
            table: {
              headerRows: 1,
              widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
              body: [
                [{ text: 'Clave', style: 'itemsTableHeader' },
                  { text: 'Nombre', style: 'itemsTableHeader' },
                  { text: 'Pzo', style: 'itemsTableHeader' },
                  { text: 'Línea', style: 'itemsTableHeader' },
                  { text: 'Facs', style: 'itemsTableHeader' },
                  { text: 'A. Max', style: 'itemsTableHeader' },
                  { text: 'Saldo', style: 'itemsTableHeader' },
                  { text: 'X Venc', style: 'itemsTableHeader' },
                  { text: 'Vdo', style: 'itemsTableHeader' },
                  { text: '1 a 30 ', style: 'itemsTableHeader' },
                  { text: '31 a 60', style: 'itemsTableHeader' },
                  { text: '61 a 90', style: 'itemsTableHeader' },
                  { text: ' 90 +', style: 'itemsTableHeader' }]
              ].concat(items)
            }
          },
          { text: 'Total de todos los clientes de crédito', style: 'header2'},
          {
            style: 'itemsTableHeader',
            table: {
              body: [
                [{text: 'Total clientes'}, 'Saldo', 'Por Vencer', 'Vencido', '1 a 30', '31 a 60', '61 a 90', '90+'],
                [
                  tot.atrasoMax.toString(),
                  currency(tot.saldo),
                  currency(tot.porVencer),
                  currency(tot.vencido.toString()),
                  currency(tot.atraso1a30),
                  currency(tot.atraso31a60),
                  currency(tot.atraso61a90),
                  currency(tot.atrasomas91),
                ]
              ]
            }
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 5],
            alignment: 'right'
          },
          subheader: {
            fontSize: 10,
            bold: true,
            margin: [0, 20, 0, 5]
          },
          itemsTable: {
            margin: [0, 5, 0, 10],
            fontSize: 7
          },
          itemsTableHeader: {
            bold: true,
            fontSize: 10,
            color: 'black'
          },
          totalsTable: {
            bold: true,
            margin: [0, 30, 0, 0]
          },
          header2: {
            fontSize: 14,
            bold: true,
            margin: [0, 0, 0, 5],
            alignment: 'left'
          },
        },
        defaultStyle: {
        }
      };
      return dd;
    }

    function print() {
      $log.info('Imprimiendo reporte...');
      var doc = createDocumentDefinition(vm.calendario, vm.clientes);
      pdfMake.createPdf(doc).open();
    }


  }
})();
