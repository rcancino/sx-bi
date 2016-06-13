(function() {
  'use strict';
  angular
    .module('sxBi')
    .controller('ResumenController', ResumenController);


  /** @ngInject */
  function ResumenController($scope, $log, calendariosService, Calificacion, $state) {
    var vm = this;
    //vm.getCalificacion = getCalificacion
    activate();
    updateGraph();
    function activate() {
      $log.info('Activando controlador: PapelKpiResumenController.....');
      vm.calendario = calendariosService.getCurrent();
      if (vm.calendario) {
        Calificacion.getCalificaciones(vm.calendario)
          .then(function(data) {
            vm.calificaciones = data;
          });
      }
      $scope.$on('CALENDARIO_UPDATED', function() {
        //$log.info('Calendario actualizado...');
        vm.calendario = calendariosService.getCurrent();
        loadCalificaciones();
        $state.go('index.indicadores.resumen');
      });
    }

    function loadCalificaciones() {
      //$log.info('Actualizando calificaciones para: ');
      if (vm.calendario) {
        Calificacion.getCalificaciones(vm.calendario)
          .then(function(data) {
            vm.calificaciones = data;
          });
      }
    }

    function updateGraph() {
      vm.labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
      var labels = [];
      for (var i = 1; i <= 53; i++) {
        labels.push(i.toString());
      }
      vm.data = {
        labels: labels,
        datasets: [
          {
            label: 'Año 2016',
            fill: false,
            borderColor: '#7B9FD6',
            backgroundColor: '#7B9FD6',
            data: [0.00, 8.51, 8.26, 8.33, 9.23, 8.89, 9.14, 8.77, 8.78, 9.29, 9.44, 9.34, 8.69, 8.79, 9.43, 9.54, 9.61, 9.69, 9.43, 9.12, 9.00, 9.32, 9.04, 0.00, ],
          },
          {
            label: 'Año 2015',
            fill: false,
            pointStyle: 'circle',
            borderColor: '#D6B43F',
            backgroundColor: '#D6B43F',
            data: [9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 9.00, 8.55, 8.44, 8.93, 9.03, 8.47, 9.17, ]
          }
        ]
      };
      vm.onClick = function (points, evt) {
        $log(points, evt);
      };

      vm.options = {
        tooltips: {
          mode: 'label',
          callbacks: {
            title: function(item) {
              return 'Semana: ' + item[0].xLabel;
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 7.5,
            },
            scaleLabel: {
              display: true,
              labelString: 'Calificación'
            }
          }],
          xAxes: [{
            display: true,
            ticks: {
              fontSize: 10,
              minRotation: 90,
            },
            scaleLabel: {
              display: true,
              labelString: 'Semanas'
            }
          }]

        },
      };
    }
  }

})();
