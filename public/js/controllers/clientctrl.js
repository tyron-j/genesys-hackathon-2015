angular.module('myApp.controllers').controller('ClientCtrl', [
	'$scope',
	'socketSvc',
	'$http',
	'toastr',
	function ($scope, socketSvc, $http, toastr) {
		console.log("ClientCtrl loaded");

		$scope.users = [];
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
		function timeConverter(UNIX_timestamp){
			var a = new Date(UNIX_timestamp * 1000);
			var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			var year = a.getFullYear();
			var month = months[a.getMonth()];
			var date = a.getDate();
			var hour = a.getHours();
			var min = a.getMinutes();
			var sec = a.getSeconds();
			var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
			return time;
		}

		// Fake data
		var fakenames = ["Tyron", "James", "Jiang", "Chuang", "Cathy", "Abigail", "Bob"];

		var socket = socketSvc.socket;

		socket.emit('agentLogin', {name: "Tyron Jung", number: "+12269299042"});

		$scope.labels = ['1', '2', '3', '4'];
		$scope.series = ['Series A'];

		$scope.data = [[65, 59, 80, 81]];

		$scope.avg_duration = "60";

		$scope.firstname = "Hilary";
		$scope.lastname = "Clinton";
		$scope.number = "+15197215399";
		$scope.location = "Toronto, Canada";

		$scope.callList = [
			{
				"id": 1,
				"agent" : "Abigail",
				"duration" : 20000,
				"timestamp" : "saturday",
				"notes" : ["[Call 1] This customer is awesome", "[Call 2] Never mind s\	he's terrible"]
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

		$scope.paths = "This, Is, An, Example".split(',');

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
				url: "http://69.204.255.92/api/text/send?to=" + $scope.number + "&message=" + $scope.msg,
				data: { }
			}
			$http(req).
				then(function(response) {
					console.log(response);
					$scope.msg = "";
				}, function(err) {
					console.log(err);
				});
		};

		$scope.sendVoiceMessage = function() {
			var req = {
				method: 'GET',
				url: "/api/leaveMessage?number="+$scope.number+"&message="+$scope.msg,
				data: {
				}
			}
			$http(req)
				.then(function(response) {
					console.log(response);
					if (response.data.status == "failed") {
						alert(response.data.reason);
					} else {
						$scope.msg = "";
					}
				}, function(err) {
					console.log(err);
				});
		};

		$scope.leaveNote = function() {
			var req = { 
				method: 'GET',
				url: "/api/leaveNote?number="+$scope.number+"&note="+$scope.newnote,
				data: {}
			}
			$http(req)
				.then(function(response) {
					console.log(response);
					$scope.notes.push($scope.newnote);
					$scope.newnote = "";
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
			$scope.paths = $scope.mostRecentCall.path.split(',');

			// initiate call duration data
			$scope.labels = [];
			$scope.data = [];
			var durations = [];
			var durations_total = 0;
			user.calls.forEach(function(call, i) {
				$scope.labels.push(i);
				durations.push(call.agentduration/1000);
				durations_total += call.agentduration/1000;
			});
			$scope.data.push(durations);
			$scope.series = ['Call Duration'];
			$scope.avg_duration = Math.round(durations_total/user.calls.length);
			$scope.notes = user.notes;

		});
	}
]);