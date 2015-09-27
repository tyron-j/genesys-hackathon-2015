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
			path: "TechSupport,TV"
		},
		{
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
});

// api logic
var api = module.exports = {
	updateProfile: function (req, res) {
		var menuDuration = parseInt(req.query.menuendtime) - parseInt(req.query.menustarttime);
		var agentDuration = parseInt(req.query.agentendtime) - parseInt(req.query.menuendtime);
		
		var number = req.query.number.replace(' ', '+');
		console.log("path: " + req.query.path, "number: " + number);
		var resultSet = users.find({number: number});
		if (resultSet.length == 0){
			
		} else {
			var user = resultSet[0];
			console.log(user);
			user.calls.push({
				menuduration: menuDuration,
				agentduration: agentDuration,
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
	}
};


// routes
app.get('/api/updateprofile', api.updateProfile);
app.get('/api/changeclient', api.changeClient);


// refresh fix; DON'T WRITE BEYOND THIS
app.get('*', views.index);