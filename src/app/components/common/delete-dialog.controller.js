(function() {
  'use strict';

  angular
    .module('sxKernell')
    .controller('DeleteDialogController', DeleteDialogController);

  /** @ngInject */
  function DeleteDialogController($scope, $uibModalInstance, config) {
    $scope.title = config.title;
    $scope.message = config.message;
    $scope.ok = function () {
      $uibModalInstance.close('ok');
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
