// public/core.js
var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
//     $locationProvider.html5Mode({
//        enabled: true,
//        requireBase: false
// });

    $locationProvider.hashPrefix('');

   $routeProvider.
   when('/home', {
      templateUrl: 'home.html', controller: 'homeController'
   }).
    when('/blockList', {
      templateUrl: 'blockList.html', controller: 'blockListController'
   }).
   
   otherwise({
      redirectTo: '/home'
   });
	
}]);
