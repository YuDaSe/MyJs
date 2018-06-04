(function(angular) {

  function StoreBridgeService(PubSubService) {
    this.PubSubService = PubSubService;
  }

  angular.extend(StoreBridgeService.prototype, {
    dispatch: function(action) {
      this.PubSubService.publish('Store::dispatch', action);
    }
  });

  StoreBridgeService.$inject = ['PubSubService'];

  angular.module('demo-app')
    .service('StoreBridgeService', StoreBridgeService);

})(window.angular);
