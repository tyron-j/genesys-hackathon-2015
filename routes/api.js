// deps
var app    = require('../app.js');
var socket = require('../socket.js').socket;
var views = require('./views.js');
var loki = require("lokijs");

var api = module.exports = {
	getUser: function (req, res) {
		console.log("path: " + req.query.path);
		res.render(req.query.path);
		res.sendStatus(200);
	}
};

// routes
app.get('/api/user', api.getUser);

var db = new loki('loki.json');

var users = db.addCollection('users');

users.insert({name:'Sleipnir', legs: 8});
users.insert({name:'Jormungandr', legs: 0});
users.insert({name:'Hel', legs: 2});

// refresh fix; DON'T WRITE BEYOND THIS
app.get('*', views.index);