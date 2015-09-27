angular.module('myApp.controllers').controller('ClientCtrl', [
	'$scope',
	function ($scope) {
		console.log("ClientCtrl!");

		$scope.firstname = "Tyron";
		console.log($scope.firstname);
		$scope.lastname = "Jiang";
		$scope.location = "Toronto, Canada";

		$scope.callList = [
			{
				"id": 1,
				"duration" : 20000,
				"timestamp" : "saturday"
			},
			{
				"id": 2,
				"duration" : 234254,
				"timestamp" : "monday"
			},
			{
				"id": 3,
				"duration" : 86787,
				"timestamp" : "tuesday"
			},
			{
				"id": 4,
				"duration" : 2345245,
				"timestamp" : "sunday"
			},
		];
		$scope.sortOrder = "id";

	}
]);