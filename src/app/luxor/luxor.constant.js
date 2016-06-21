(function() {
  'use strict';
  angular
    .module('sxBi')
    .constant('Config', {
      //'API_ENDPOINT': 'https://papel.dyndns-remote.com/api'
      'API_ENDPOINT': 'http://localhost:8080/api'
    });
})();
