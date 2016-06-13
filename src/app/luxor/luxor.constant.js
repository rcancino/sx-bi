(function() {
  'use strict';
  angular
    .module('sxBi')
    .constant('Config', {
      'API_ENDPOINT': 'http://papel.dyndns-remote.com:8080/api'
      //'API_ENDPOINT': 'http://localhost:8080/api/'
    });
})();
