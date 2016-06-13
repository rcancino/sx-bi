(function() {
  'use strict';

  angular
    .module('sxKernell')
    .controller('BancoController', BancoController);

  /** @ngInject */
  function BancoController(toastr, Banco, $uibModal, $log) {
    var vm = this;
    vm.showToastr = showToastr;
    vm.eliminar = eliminar;

    activate();

    function activate() {
      vm.bancos = Banco.query();
    }

    function showToastr() {
      toastr.info('<b>Toaser Kool</b>');
    }

    function eliminar(banco) {
      var modal = $uibModal.open( {
        animation: true,
        templateUrl: 'app/components/common/delete-dialog.html',
        controller: 'DeleteDialogController',
        resolve: {
          config: function() {
            return {title: 'Eliminación de banco', message: banco.clave};
          }
        }
      });

      modal.result.then( function() {
        Banco.remove({id: banco.id}, banco, function(banco) {
          $log.info('Banco eliminado: ' + angular.toJson(banco));
          toastr.warning('Banco eliminado: ' + banco.clave, 'Eliminación exitosa');
          vm.bancos = Banco.query();
        }, function(response) {
          toastr.error(angular.toJson(response), 'Error al tratar de eliminar', {closeButton: true, extendedTimeOut: 0, timeOut: 0});
        });
      });
    }
  }
})();
