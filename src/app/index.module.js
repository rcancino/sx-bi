// Exception solo para no tener que nombrar
(function() {
  'use strict';

  /**
  * @desc Modulo principal de SiipapX Kernell
  * Nota: Usamos una etiqueta especial de eslint para permitir  que
  * el nombre de este archivo sea index.module.js y no sx-kernell.module.js
  */
  /* eslint angular/file-name: 0 */
  angular
    .module('sxKernell', ['ui.bootstrap', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'toastr', 'ui.mask', 'localytics.directives', 'sxBi']);

})();
