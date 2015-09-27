angular.module('myApp', [
	'ngRoute',

	'myApp.controllers'
]).config(function ($routeProvider, $locationProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'partials/home',
		controller: 'HomeCtrl'
	}).otherwise({
		redirectTo: '/home'
	});

	$locationProvider.html5Mode(true);

	console.log("Heyyyy");
});