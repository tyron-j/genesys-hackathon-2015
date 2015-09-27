angular.module('myApp', [
	'ngRoute',

	'myApp.controllers'
]).config(function ($routeProvider, $locationProvider) {
	$routeProvider.when('/client', {
		templateUrl: 'partials/client',
		controller: 'ClientCtrl'
	}).otherwise({
		redirectTo: '/client'
	});

	$locationProvider.html5Mode(true);

	console.log("Heyyyy");
});