// deps
var app    = require('../app.js');
var socket = require('../socket.js').socket;
var views = require('./views.js');
var loki = require("lokijs");

// db init
var db = new loki('loki.json');
var users = db.addCollection('users');

users.insert({
	number: "+12269899298", 
	location: "Toronto, Ontario", 
	name:'Donald Trump',
	calls: [
		{
			agent: "Chuang Li",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			path: "TechSupport,TV"
		},
		{
			agent: "Chuang Li",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			path: "AccountChanges,Changes,Personal"
		}
	]
});
users.insert({
	number: "+15197215399", 
	location: "Vancouver, British Columbia", 
	name:'Barack Obama',
	calls: [
		{
			path: "AccountChanges, Cancellations"
		}	
	]		
});

// get client socket
var emit; // emit function

socket.on('connection', function (_socket) {
	emit = _socket.emit.bind(_socket);
	
	_socket.on('agentLogin', function (res) {
		
	});
});

// api logic
var api = module.exports = {
	updateProfile: function (req, res) {
		/*console.log(parseInt(req.query.menustarttime));
		console.log(parseInt(req.query.menuendtime));
		var menuDuration = parseInt(req.query.menuendtime) - parseInt(req.query.menustarttime);
		var agentDuration = parseInt(req.query.agentendtime) - parseInt(req.query.menuendtime);
		*/
		var agentDuration = Math.floor(Math.random() * (30000-15000) + 15000);
		var number = req.query.number.replace(' ', '+');
		console.log("path: " + req.query.path, "number: " + number);
		var resultSet = users.find({number: number});
		if (resultSet.length == 0){
			
		} else {
			var user = resultSet[0];
			console.log(user);
			user.calls.push({
				agent: "Tyron Jung",
				menuduration: parseInt(req.query.menuduration),
				agentduration: agentDuration,
				agentendtime: parseInt(req.query.menuendtime) + agentDuration,
				path: req.query.path});
			console.log(users.find({number: number})[0]);
		}
		res.sendStatus(200);
	},
	
	changeClient: function (req, res){
		var number = req.query.number.replace(' ', '+');
		console.log(number);
		var sendObject = users.find({number: number})[0];
		console.log(sendObject);
		emit('clientChange', sendObject);
		res.sendStatus(200);
	},
	
	getLast: function(req, res) {
		var number = req.query.number.replace(' ', '+');
		console.log(number);
		var resultSet = users.find({number: number});
		if (resultSet.length == 0){
		
		} else {
		var callsList = users.find({number: number})[0].calls;
		var lastCall = callsList[callsList.length - 1];
		console.log(lastCall);
		res.json(lastCall);
		}
	}
};


// routes
app.get('/api/updateprofile', api.updateProfile);
app.get('/api/changeclient', api.changeClient);
app.get('/api/getlast', api.getLast);

// refresh fix; DON'T WRITE BEYOND THIS
app.get('*', views.index);