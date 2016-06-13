(function() {
  'use strict';

  angular
    .module('sxKernell')
    .controller('BancoEditController', BancoEditController);

  /** @ngInject */
  function BancoEditController(Banco, $state, $stateParams, $log, toastr, MessageUtils) {
    var vm = this;
    vm.salvar = salvar;
    activate();

    function activate() {
      if ($stateParams.bancoId) {
        vm.bancoId = $stateParams.bancoId;
        Banco.get({id: $stateParams.bancoId}, function(banco) {
          vm.editedBanco = banco;
        }, function(response) {
          $log.error(angular.toJson(response));
        });
      }
    }

    function salvar(banco) {
      $log.info('Salvando banco: ' + angular.toJson(banco));
      Banco.update({id: banco.id}, banco, function(banco) {
        toastr.success('Banco actualizado ' + banco.clave);
        $state.go('index.bancos');
      }, function(response) {
        vm.errors = MessageUtils.getErrors(response);
        MessageUtils.showError(response);
      });
    }

  }
})();
