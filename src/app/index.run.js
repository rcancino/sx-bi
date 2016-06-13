(function() {
  'use strict';

  angular
    .module('sxKernell')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
