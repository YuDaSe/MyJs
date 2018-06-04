(function(angular) {
  'use strict';

  function PubSubService() { return window.PubSub; }

  angular.module('demo-app')
    .factory('PubSubService', PubSubService);

})(window.angular);
