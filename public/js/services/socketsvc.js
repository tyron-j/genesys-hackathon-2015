angular.module('myApp.services').factory('socketSvc', [
	'socketFactory',

	function (socketFactory) {
		return {
			socket: socketFactory()
		};
	}]
);