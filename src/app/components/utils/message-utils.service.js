(function() {
  'use strict';

  angular
    .module('sxKernell')
    .factory('MessageUtils', MessageUtils);

  /** @ngInject */
  function MessageUtils($log, toastr) {
    var service = {
      showError: showError,
      getErrors: getErrors,
      getErrorMessage: getErrorMessage
    };
    return service;

    function getErrors(response) {
      var errors = [];
      if (response.data.message) {
        errors.push(response.data.message);
      } else {
        if (response.data._embedded) {
          response.data._embedded.errors.forEach( function(element) {
            errors.push(element.message);
          });
        }
      }
      return errors;
    }

    function getErrorMessage(response) {
      if (response.data) {
        return getErrors(response).join();
      } else {
        return angular.toJson(response);
      }
    }

    function showError(response) {
      var message = getErrorMessage(response);
      var title = 'Erro en el servidor: ' + response.status + ' ' + response.statusText;
      toastr.error(message, title, {closeButton: true, extendedTimeOut: 0, timeOut: 0});
      $log.error(angular.toJson(response));
    }
  }
})();
