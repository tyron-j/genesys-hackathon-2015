// deps
var app    = require('../app.js');
var socket = require('../socket.js').socket;
var views = require('./views.js');
var loki = require("lokijs");

var api = module.exports = {
	getUser: function (req, res) {
		console.log("path: " + req.query.path);
		res.send(req.query.path);
	}
};

// routes
app.get('/api/user', api.getUser);

var db = new loki('loki.json');

var users = db.addCollection('users');

users.insert({name:'Donald Trump', legs: 3});
users.insert({name:'Barack Obama', legs: 0});

// refresh fix; DON'T WRITE BEYOND THIS
app.get('*', views.index);