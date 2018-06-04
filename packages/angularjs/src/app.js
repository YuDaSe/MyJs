(function(angular) {

  angular
    .module('demo-app', ['ngRoute',])
    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.hashPrefix('');
    }]);

})(window.angular);
