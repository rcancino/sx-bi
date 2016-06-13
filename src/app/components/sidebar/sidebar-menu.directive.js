(function () {
  'use strict';

  /**
  * @desc Directiva para construir el side menu usandi metisMenu
  * @example <div sx-side-nav></div>
  */
  angular
  .module('sxKernell')
  .directive('sxSidebarMenu', sidebarMenu);

  /** @ngInject */
  function sidebarMenu ($timeout) {
    var directive = {
      restrict: 'A',
      link: function(scope, element) {
        // Call the metsiMenu plugin and plug it to sidebar navigation
        $timeout(function() {
          element.metisMenu();
        });
      }
    };
    return directive;
  }

})();
