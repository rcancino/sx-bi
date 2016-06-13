(function () {
  'use strict';

  /**
  * @desc Directive used to  minimalize button
  * @example <div sx-side-nav></div>
  */
  angular
  .module('sxKernell')
  .directive('sxMinimalizeSidebar', minimalizeSidebar);

  /** @ngInject */
  function minimalizeSidebar () {
    var directive = {
      restrict: 'A',
      template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="vm.minimalize()"><i class="fa fa-bars"></i></a>',
      controller: MinimalizeController,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;
  }

  /** @ngInject */
  function MinimalizeController ($timeout) {
    var vm = this;
    vm.minimalize = function () {
      angular.element('body').toggleClass('mini-navbar');
      if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        angular.element('#side-menu').hide();
        // For smoothly turn on menu
        $timeout(function () {
          angular.element('#side-menu').fadeIn(400);
        }, 200);
      } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        angular.element('#side-menu').removeAttr('style');
      }
    };
  }

})();
