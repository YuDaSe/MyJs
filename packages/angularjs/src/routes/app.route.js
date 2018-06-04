(function (angular) {
  angular.module('demo-app').config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/test', {
          templateUrl: 'route-one.html',
          controller: 'FirstController',
          controllerAs: 'ctrl',
          bindToController: true
        });
    },
  ]);
}(window.angular));
