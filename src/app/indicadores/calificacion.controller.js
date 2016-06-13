(function() {
  'use strict';
  angular
    .module('sxBi')
    .controller('CalificacionController', CalificacionController);

  CalificacionController.$inject = ['Calificacion', '$stateParams', '$log'];

  function CalificacionController(Calificacion, $stateParams, $log) {
    var vm = this;
    vm.title = $stateParams.tipo;
    activate();
    function activate() {
      $log.info('Activando controlador CalificacionController...' + angular.toJson($stateParams) );
      Calificacion.getPartidas($stateParams.calificacionId)
        .then( function(data) {
          vm.partidas = data;
        });

    }
  }
})();
