(function() {
  'use strict';

  angular
    .module('sxKernell')
    .factory('Banco', Banco);

  /** @ngInject */
  function Banco($resource) {
    //var uri = 'http://localhost:8080/api/tesoreria/bancos/:id';
    var uri = 'http://localhost:8080/api/tesoreria/bancos/:id';
    var object = $resource(uri, null, {
      'update': {method: 'PUT'}
    });

    return object;
  }
})();
