// deps
var io   = require('socket.io');
var http = require('http');

var app = require('./app.js');

// set up socket
var server = http.createServer(app);

var socket = io(server).on('connection', function (socket) {
	console.log("Client connected");

	// test
	setTimeout(function () {
		console.log("Broadcasting...");

		socket.broadcast.emit('clientChange', {
			hello: "world!"
		});
	}, 3000);

	socket.on('disconnect', function () {
		console.log("Client disconnected");
	});
});

module.exports = {
	socket: socket,
	server: server
};