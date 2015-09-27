angular.module('myApp', [
	'ngRoute',
	'chart.js',
	'ngAnimate',
	'toastr',
	'myApp.services',
	'myApp.controllers'
]).config(function ($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$routeProvider
		.when('/', {
			templateUrl: 'partials/client',
			controller: 'ClientCtrl'
		})
		.when('/client', {
			templateUrl: '/partials/client',
			controller: 'ClientCtrl'
		})
		.otherwise({
			redirectTo: '/client'
		});


	console.log("Heyyyy");
});