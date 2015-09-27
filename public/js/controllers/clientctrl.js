angular.module('myApp.controllers').controller('ClientCtrl', [
	'$scope',
	'socketSvc',

	function ($scope, socketSvc) {
		console.log("ClientCtrl loaded");

		var socket = socketSvc.socket;

		$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
		$scope.series = ['Series A', 'Series B'];

		$scope.data = [
			[65, 59, 80, 81, 56, 55, 40],
			[28, 48, 40, 19, 86, 27, 90]
		];

		$scope.avg_duration = "20 min 29 s";

		$scope.firstname = "Tyron";
		console.log($scope.firstname);
		$scope.lastname = "Jiang";
		$scope.location = "Toronto, Canada";

		$scope.callList = [
			{
				"id": 1,
				"agent" : "Abigail",
				"duration" : 20000,
				"timestamp" : "saturday",
				"notes" : ["Call 1---This customer is awesome", "nevermind he is so bad"]
			},
			{
				"id": 2,
				"agent" : "Bob",
				"duration" : 234254,
				"timestamp" : "monday",
				"notes" : ["Call 2---module fails to load due to some exception. The error message above should provide additional context", "nevermind he is so bad"]
			},
			{
				"id": 3,
				"agent" : "Catherine",
				"duration" : 86787,
				"timestamp" : "tuesday",
				"notes" : ["Call 3---This customer is awesome", "nevermind he is so bad"]
			},
			{
				"id": 4,
				"agent" : "Dick",
				"duration" : 2345245,
				"timestamp" : "sunday",
				"notes" : ["Call 4---This customer is awesome", "nevermind he is so bad"]
			},
		];
		$scope.sortOrder = "id";

		$scope.notes = $scope.callList[0].notes;
		$scope.showNotes = function(id) {
			var matchedCalls = $scope.callList.filter(function(call) {
				return id === call.id;
			});
			$scope.notes = matchedCalls[0].notes;
		}


		// socket logic
		socket.on('socketConnection', function (res) {
			console.log(res.msg);
		});

		socket.on('clientChange', function (res) {
			console.log(res);
			var user = res;
			$scope.name = user.name;
			$scope.number = user.number;
			$scope.location = user.location;
			$scope.paths = user.paths;
			$scope.firstname = user.name.split(' ')[0];
			$scope.firstname = user.name.split(' ')[1];
			$scope.apply();
		});
	}
]);