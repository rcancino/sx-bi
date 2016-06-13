(function() {
  'use strict';

  angular
    .module('sxKernell')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, uibDatepickerConfig, uibDatepickerPopupConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 7000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;

    uibDatepickerConfig.formatYear = 'yyyy';
    uibDatepickerConfig.startingDay = 1;
    uibDatepickerConfig.showWeeks = false;
    uibDatepickerPopupConfig.datepickerPopup = 'dd/MM/yyyy';
    uibDatepickerPopupConfig.currentText = 'Seleccinada';
    uibDatepickerPopupConfig.clearText = 'Limpiar';
    uibDatepickerPopupConfig.closeText = 'Cerrar';
  }

})();
