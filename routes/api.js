// deps
var app    = require('../app.js');
var socket = require('../socket.js').socket;
var views = require('./views.js');
var loki = require("lokijs");
var request = require("request");

// db init
var db = new loki('loki.json');
var users = db.addCollection('users');

// db mock data
users.insert({
	number: "+12269899298", 
	location: "Toronto, Ontario", 
	name:'Donald Trump',
	messages:[],
	notes:[],
	calls: [
		{
			agent: "Chuang Li",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			agentendtime: 1443372037263 + Math.floor(Math.random() * (30000-15000) + 15000),
			path: "TechSupport,TV"
		},
		{
			agent: "Chuang Li",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			agentendtime: 1443372037263 + Math.floor(Math.random() * (30000-15000) + 15000),
			path: "AccountChanges,Changes,Personal"
		},
		{
			agent: "Chuang Li",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			agentendtime: 1443372037263 + Math.floor(Math.random() * (30000-15000) + 15000),
			path: "AccountChanges,Changes,Personal"
		},
		{
			agent: "Chuang Li",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			agentendtime: 1443372037263 + Math.floor(Math.random() * (30000-15000) + 15000),
			path: "AccountChanges,Changes,Personal"
		},
		{
			agent: "Chuang Li",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			agentendtime: 1443372037263 + Math.floor(Math.random() * (30000-15000) + 15000),
			path: "AccountChanges,Changes,Personal"
		},
		{
			agent: "Chuang Li",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			agentendtime: 1443372037263 + Math.floor(Math.random() * (30000-15000) + 15000),
			path: "AccountChanges,Changes,Personal"
		}
	]
});
users.insert({
	number: "+15197215399", 
	location: "Vancouver, British Columbia", 
	name:'Barack Obama',
	messages:[],
	notes:[],
	calls: [
		{
			agent: "Tyron Jung",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			agentendtime: 1443372037263 + Math.floor(Math.random() * (30000-15000) + 15000),
			path: "AccountChanges, Cancellations"
		},	
		{
			agent: "Tyron Jung",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			agentendtime: 1443372037263 + Math.floor(Math.random() * (30000-15000) + 15000),
			path: "AccountChanges, Cancellations"
		},
		{
			agent: "Tyron Jung",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			agentendtime: 1443372037263 + Math.floor(Math.random() * (30000-15000) + 15000),
			path: "AccountChanges, Cancellations"
		},
		{
			agent: "Tyron Jung",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			agentendtime: 1443372037263 + Math.floor(Math.random() * (30000-15000) + 15000),
			path: "AccountChanges, Cancellations"
		},	
		{
			agent: "Tyron Jung",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			agentendtime: 1443372037263 + Math.floor(Math.random() * (30000-15000) + 15000),
			path: "AccountChanges, Cancellations"
		},	
		{
			agent: "Tyron Jung",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			agentendtime: 1443372037263 + Math.floor(Math.random() * (30000-15000) + 15000),
			path: "AccountChanges, Cancellations"
		},	
		{
			agent: "Tyron Jung",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			agentendtime: 1443372037263 + Math.floor(Math.random() * (30000-15000) + 15000),
			path: "AccountChanges, Cancellations"
		},	
		{
			agent: "Tyron Jung",
			agentduration: Math.floor(Math.random() * (30000-15000) + 15000),
			agentendtime: 1443372037263 + Math.floor(Math.random() * (30000-15000) + 15000),
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
	},
	
	leaveMessage: function(req, res) {
		console.log(req.query.number);
		var number = req.query.number.replace(' ', '+');
		request({
			uri: "http://api.meaningcloud.com/sentiment-2.0?key=6093768d2179b8842f4f84f5f4a4f768&of=json&txt=" + encodeURIComponent(req.query.message) + "&model=general_en",
			method: "POST",
			timeout: 10000,
			followRedirect: true,
			maxRedirects: 10
			}, function(err, response, body){
			if (err) { console.log(err); return; }
			var meaningCloud = JSON.parse(response.body);
			var sentiment = meaningCloud.sentence_list[0].score_tag;
			var confidence = meaningCloud.sentence_list[0].confidence;
			console.log(confidence);
			console.log(sentiment);
			if (confidence > 75 && (sentiment == "N" || sentiment == "N+")){
				res.json({status: "failed", reason: "too negative"});
			} else {
				var user = users.find({number: number})[0];
				user.messages.push(req.query.message);
				console.log(user);
				res.json({status: "success", reason: "approved"});
			}
			}
		); 
	},
	
	getMessages: function(req, res){
		var number = req.query.number.replace(' ', '+');
		console.log(number);
		var resultSet = users.find({number: number});
		if (resultSet.length == 0){
		
		} else {
			var messages = users.find({number: number})[0].messages;
			console.log(messages);
			res.json({messages: messages});
		}
	},
	
	deleteMessages: function(req, res){
		var number = req.query.number.replace(' ', '+');
		console.log(number);
		var resultSet = users.find({number: number});
		if (resultSet.length == 0){
		
		} else {
			var user = users.find({number: number})[0];
			user.messages = [];
			console.log(users.find({number: number})[0]);
		}
	},
	
	leaveNote: function(req, res){
		var number = req.query.number.replace(' ', '+');
		console.log(number);
		var resultSet = users.find({number: number});
		if (resultSet.length == 0){
		
		} else {
			var user = users.find({number: number})[0];
			user.notes.push(req.query.note);
			console.log(users.find({number: number})[0]);
			res.json({status: "success", reason: "approved"});
		}
	}
};


// routes
app.get('/api/updateprofile', api.updateProfile);
app.get('/api/changeclient', api.changeClient);
app.get('/api/getlast', api.getLast);
app.get('/api/getmessages', api.getMessages);
app.get('/api/deletemessages', api.deleteMessages);
app.get('/api/leavemessage', api.leaveMessage);
app.get('/api/leavenote', api.leaveNote);

// refresh fix; DON'T WRITE BEYOND THIS
app.get('*', views.index);