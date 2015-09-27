angular.module('myApp.controllers').controller('ClientCtrl', [
	'$scope',
	'socketSvc',
	'$http',
	function ($scope, socketSvc, $http) {
		console.log("ClientCtrl loaded");

		// Helper functions
		function makeid(size, length) {
			var texts = [];
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for (var j=0; j < size; j++) {
				for( var i=0; i < length; i++ ) {
					text += possible.charAt(Math.floor(Math.random() * possible.length));
				}
				texts.push(text);
				text = "";
			}
			return texts;
		}
		function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex ;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		}

		// Fake data
		var fakenames = ["Tyron", "James", "Jiang", "Chuang", "Cathy", "Abigail", "Bob"];

		var socket = socketSvc.socket;

		socket.emit('agentLogin', {name: "Tyron Jung", number: "+12269299042"});

		$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
		$scope.series = ['Series A', 'Series B'];

		$scope.data = [
			[65, 59, 80, 81, 56, 55, 40],
			[28, 48, 40, 19, 86, 27, 90]
		];

		$scope.avg_duration = "20 min 29 s";

		$scope.firstname = "Tyron";
		$scope.lastname = "Jiang";
		$scope.number = "15197215399";
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

		$scope.sendSMS = function() {
			var req = {
				method: 'POST',
				url: "http://69.204.255.92/api/text/send?to=" + $scope.number + "&msg=" + $scope.msg,
				data: { }
			}
			$http(req).
				then(function(response) {
					console.log(response);
				}, function(err) {
					console.log(err);
				});
		}


		// socket logic
		socket.on('socketConnection', function (res) {
			console.log(res.msg);
		});

		socket.on('clientChange', function (res) {
			console.log(res);
			var user = res;

			// Initiate user information
			$scope.name = user.name;
			$scope.firstname = user.name.split(' ')[0];
			$scope.lastname = user.name.split(' ')[1];
			$scope.number = user.number;
			$scope.location = user.location;

			// Initiate call list
			$scope.callList = [];
			$scope.paths = [];
			user.calls.forEach(function(call, i) {
				$scope.callList.push({
					"id" : i,
					"agent": shuffle(fakenames)[i],
					"notes": makeid(3, 123)
				});
			});

			// find most recent call object
			$scope.mostRecentCall = user.calls
				.filter(function(call) {return call.agentendtime;})
				.sort(function(call1, call2) {
					if (call1.agentendtime < call2.agentendtime) return 1;
					if (call1.agentendtime > call2.agentendtime) return -1;
					return 0;
			})[0];

			// initiate call duration data
			$scope.labels = [];
			$scope.data = [];
			user.calls.forEach(function(call, i) {
				$scope.labels.push(call.i);
				$scope.data.push(call.agentduration/1000);
			});
			$scope.series = ['Call Duration'];

		});
	}
]);