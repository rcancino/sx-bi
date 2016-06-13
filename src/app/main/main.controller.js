(function() {
  'use strict';

  angular
    .module('sxKernell')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1462665579180;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      $timeout(function() {
        vm.classAnimation = 'bounce';
      }, 4000);
    }

    function showToastr() {
      toastr.info('<b>Toaser Kool</b>');
    }
  }
})();
