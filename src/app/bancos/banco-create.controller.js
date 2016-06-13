(function() {
  'use strict';

  angular
    .module('sxKernell')
    .controller('BancoCreateController', BancoCreateController);

  /** @ngInject */
  function BancoCreateController(Banco, $state, $log, toastr, MessageUtils) {
    var vm = this;
    vm.salvar = salvar;
    activate();

    function activate() {
      vm.editedBanco = new Banco({claveSat: '00'});
    }

    function salvar(banco) {

      $log.info('Salvando banco: ' + angular.toJson(banco));
      banco.$save(function(banco) {
        toastr.success('Banco actualizado ' + banco.clave);
        $state.go('index.bancos');
      }, function(response) {
        vm.errors = MessageUtils.getErrors(response);
        MessageUtils.showError(response);
      });
    }

  }
})();
