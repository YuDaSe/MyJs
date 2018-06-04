(function(angular) {

  function DemoComponentController() {}

  Object.assign(DemoComponentController.prototype, {
    notify: function() {
      this.onButtonClick();
    }
  });

  angular.module('demo-app')
    .component('demoComponent', {
      templateUrl: 'demo-component.html',
      controller: DemoComponentController,
      bindings: {
        title: '@',
        onButtonClick: '&'
      }
    });

})(window.angular);
