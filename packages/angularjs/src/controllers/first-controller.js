(function(angular) {

  function FirstController(StoreBridgeService) {
    this.title = 'FirstController';
    this.StoreBridgeService = StoreBridgeService;
  }

  Object.assign(FirstController.prototype, {
    notify: function() {
      const action = {
        type: '[TEST ACTION]',
        payload: 'hi'
      };

      console.log('acton dispatch to the store', action);
      this.StoreBridgeService.dispatch(action);
    }
  });

  FirstController.$inject = ['StoreBridgeService'];

  angular.module('demo-app').controller('FirstController', FirstController);

})(window.angular);
